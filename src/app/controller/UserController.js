var {date} =require("../lib/configs/utils")
var User =require("../models/User")

module.exports = {
    registerForm(req,res){
        return res.render("user/registro")
    },

    show(req,res){
      return res.send("ok cadastrado")  
    },

  async  post(req,res){
      const userId = await User.create(req.body)

      req.session.userId = userId

        return res.redirect("/users/registro")

    }
}