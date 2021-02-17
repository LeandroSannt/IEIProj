var {date} =require("../lib/configs/utils")
const financeiro = require("../models/financeiro")
var Financeiro =require("../models/financeiro")

module.exports={
    
 async index(req,res){

    const{filter} =req.query

    if(filter){
        
        results = await Financeiro.filter(filter)
        const financeiro = results.rows
    
        results = await Financeiro.totalValores()
        const totalValores = results.rows

        results = await Financeiro.totalPagos()
        const totalPagos = results.rows

        results = await Financeiro.totalNpagos()
        const totalNpagos = results.rows

            return res.render("financeiro/index",{financeiro,totalValores,totalPagos,totalNpagos}) 
    }else{

        let results = await Financeiro.all()
        const financeiro = results.rows
    
        results = await Financeiro.totalValores()
        const totalValores = results.rows

        results = await Financeiro.totalPagos()
        const totalPagos = results.rows

        results = await Financeiro.totalNpagos()
        const totalNpagos = results.rows
            return res.render("financeiro/index",{financeiro,totalValores,totalPagos,totalNpagos}) 

        }
    },

async financeiroConsultas(req,res){
    let results = await Financeiro.find(req.params.id)
    profissional =results.rows[0]

    results = await Financeiro.findConsultas(req.params.id)
    consultas =results.rows
    consultas.data = date(consultas.data)
    
    if(!financeiro) return res.send("profissional não encontrada")

    return res.render(`financeiro/profissional-consultas`,{ profissional,consultas}) 

    },


async consultasAbertas(req,res){
        results = await Financeiro.selectNpagos()
        const selectNpagos = results.rows
        return res.render("financeiro/consultas-abertas",{selectNpagos})

    },

async consultasFechadas(req,res){

    results = await Financeiro.selectPagos()
    const selectPagos = results.rows
    return res.render("financeiro/consultas-fechadas",{selectPagos})
    
    },


}

