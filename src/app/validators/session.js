var User =require("../models/User")
const {compare } = require("bcryptjs")

async function login(req,res,next){
    const {email,senha } = req.body

    const user = await User.findOne({where:{email}})

    if (!user) return res.render("session/login",{
        user:req.body,
        error: "Usuario não encontrado"
    })

    const passed = await compare(senha, user.senha)

    if (!passed) return res.render("session/login",{
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user
    next()
}

async function forgot (req,res,next){
    const {email } = req.body

    try{

        let user = await User.findOne({where:{email}})

        if (!user) return res.render( "session/forgot-password",{
            user:req.body,
            error:"Email não cadastrado!"
        })

        req.user = user

        next()
    }catch(err){
        console.error(err)
    }
}

async function reset(req,res,next){
    const {email,senha, token, senhaRepeat } = req.body

    const user = await User.findOne({where:{email}})

    if (!user) return res.render("session/password-reset",{
        user:req.body,
        token,
        error: "Usuario não encontrado"
    })

    if(senha != senhaRepeat) return res.render ("session/password-reset",{
        user:req.body,
        token,
        error:"Senha e repetição de senha estão diferentes "
    })

    if(token != user.reset_token) return  res.render("session/password-reset",{
        user:req.body,
        token,
        error: "Token invalido, solicite uma nova recuperação de senha"
    })       

    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) return  res.render("session/password-reset",{
        user:req.body,
        token,
        error: "Token expirado ! Por favor, solicite uma nova recuperação de senha"
    }) 

    req.user = user
    next()
    
}

module.exports = {
    login,
    forgot,
    reset
}