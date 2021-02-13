var User =require("../models/User")
const {compare } = require("bcryptjs")

function checkAllFields(body){
    const keys =Object.keys(body)
    for(key of keys){
        if(body[key] == "" ){
        return  {
            user:body,
            error:"porfavor preencha todos os campos."
            }
        }
    }
}

async function show(req,res,next){
    
    const {userId: id}= req.session
    const user = await User.findOne({where:{id} })

    if (!user) return res.render("user/index",{
      error:"usuario não encontrado!"
    })

    req.user = user
    next()
}
async function post(req,res,next){
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("user/registro", {fillAllFields})
    }

    let { email, cpf_cnpj, senha, senhaRepeat} = req.body
    //cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
    
    const user = await User.findOne({
        where:{email},
        or:{cpf_cnpj}
    })

    if(user) return res.render("user/registro",{
        user:req.body,
        error: "Usuario ja cadastrado."
    })
    
    if(senha != senhaRepeat) return res.render ("user/registro",{
            user:req.body,
            error:"Senha e repetição de senha estão diferentes "
        })
        next()
}
async function update(req,res,next){
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("user/index", {fillAllFields})
    }

    const {id, senha} = req.body
    if(!senha) return res.render("user/index",{
        user:req.body,
        error:"Coloque sua senha para atualizar seu cadastro"
    })
    const user = await User.findOne({where:{id}})
    const passed = await compare(senha, user.senha)
    if(!passed)return res.render("user/index",{
        user:req.body,
        error:"senha incorreta"
    })
    req.user = user
    next()
}

module.exports = {
    show,
    post,
    update
}