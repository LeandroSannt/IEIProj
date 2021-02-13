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

module.exports = {
    login
}