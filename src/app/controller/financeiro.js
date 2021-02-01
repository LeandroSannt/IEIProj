var {age, date} =require("../lib/configs/utils")
var Financeiro =require("../models/financeiro")

module.exports={
    
 async index(req,res){
     
    return res.render("financeiro/index") 
    },

}

