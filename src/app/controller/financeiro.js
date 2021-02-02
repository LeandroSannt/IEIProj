var {age, date} =require("../lib/configs/utils")
var Financeiro =require("../models/financeiro")

module.exports={
    
 async index(req,res){

    let results = await Financeiro.all()
    const financeiro = results.rows
    
    results = await Financeiro.findBy(req.params.id)
    const profissional = results.rows[0]
    
    results = await Financeiro.totalValores()
    const totalValores = results.rows
    
    return res.render("financeiro/index",{financeiro,profissional,totalValores}) 

    },
    


}

