var User =require("../models/User")
const {formatCpfCnpj} = require("../lib/configs/utils")

module.exports = {
    registerForm(req,res){
        return res.render("user/registro")
    },

  async show(req,res){
    const {user} = req

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)

    return res.render("user/index", {user})  
    },

  async  post(req,res){
      const userId = await User.create(req.body)
      req.session.userId = userId

      return res.redirect("/user/index")
    },

  async update(req,res){
    try{
      const {user} = req
      let { nome, email, cpf_cnpj} = req.body
      cpf_cnpj = cpf_cnpj.replace(/\D/g,"")

      await User.update(user.id,{
        nome,
        email,
        cpf_cnpj
      })
      return res.render("user/index",{
        user:req.body,
        success:"Conta atualizada com sucesso"
      })

    }catch(err){
      console.error(err)
      return res.render("user/index",{
        error:"Algum error aconteceu"
        })
      }
    },
}