var {date} =require("../lib/configs/utils")
var User =require("../models/User")

module.exports = {
    registerForm(req,res){
        return res.render("user/registro")
    },

  async  post(req,res){

            return res.send("Pass")

    }
}