var {date} =require("../lib/configs/utils")
const { piscicologia } = require("../models/consultas")
var Consultas =require("../models/consultas")

module.exports={
    
 async index(req,res){

    const {filter} = req.query

    if(filter){
        let results = await Consultas.filter(filter)
        const consultas = results.rows
        consultas.data = date(consultas.data).format

        results = await Consultas.totalConsultas()
        const totalConsultas = results.rows

        results = await Consultas.piscicologia(req.body)
        const totalPiscicologia = results.rows
    
        results = await Consultas.nutricao(req.body)
        const totalNutricao = results.rows
            return res.render("consultas/index",{consultas,totalConsultas,totalPiscicologia,totalNutricao}) 

    }else{

        let results = await Consultas.all(req.body)
        const consultas = results.rows
        consultas.data = date(consultas.data).format

        results = await Consultas.totalConsultas()
        const totalConsultas = results.rows

        results = await Consultas.piscicologia(req.body)
        const totalPiscicologia = results.rows
    
        results = await Consultas.nutricao(req.body)
        const totalNutricao = results.rows
            return res.render("consultas/index",{consultas,totalConsultas,totalPiscicologia,totalNutricao}) 

        }
    },

 async total(req,res){
    let results = await Consultas.totalConsultasDia(req.body)
    const consultas = results.rows
    consultas.data = date(consultas.data).format

    results = await Consultas.totalConsultas()
    const totalConsultas = results.rows

    results = await Consultas.piscicologia(req.body)
    const totalPiscicologia = results.rows

    results = await Consultas.nutricao(req.body)
    const totalNutricao = results.rows
    return res.render("consultas/consultasDia",{consultas,totalConsultas,totalPiscicologia,totalNutricao})

    },

async nutricao(req,res){
    let results = await Consultas.totalNutricao(req.body)
    const consultas = results.rows
    consultas.data = date(consultas.data).format

    results = await Consultas.totalConsultas()
    const totalConsultas = results.rows

    results = await Consultas.piscicologia(req.body)
    const totalPiscicologia = results.rows

    results = await Consultas.nutricao(req.body)
    const totalNutricao = results.rows
    return res.render("consultas/consultasNutricao",{consultas,totalConsultas,totalPiscicologia,totalNutricao})

    },

async piscicologia(req,res){
        let results = await Consultas.totalPiscicologia(req.body)
    const consultas = results.rows
    consultas.data = date(consultas.data).iso

    results = await Consultas.totalConsultas()
    const totalConsultas = results.rows

    results = await Consultas.piscicologia(req.body)
    const totalPiscicologia = results.rows

    results = await Consultas.nutricao(req.body)
    const totalNutricao = results.rows
    return res.render("consultas/consultasPiscicologia",{consultas,totalConsultas,totalPiscicologia,totalNutricao})

    },

async create(req,res){
    let results = await Consultas.profissionaisSelect(req.body)
    const options = results.rows
        
    return res.render("consultas/create",{profissionaisOptions:options})
    },
    
async post(req,res){
    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "" && key != "observacao"){
        return res.send("dados faltando")
        }
    }
    let results = await Consultas.create(req.body)
    const consultas = results.rows
    consultas.data = date(consultas.data).iso

    return res.render(`consultas/index`,{consultas})
    },

async show(req,res){ 
    let results = await Consultas.find(req.params.id)
    consulta =results.rows[0]
    consulta.data = date(consulta.data).format

    results = await Consultas.findBy(req.params.id)
    find = results.rows[0]
    
    if(!consulta) return res.send("consulta não encontrada")
        return res.render(`consultas/show`,{find,consulta})

    },
    
async edit(req,res){
    let results = await Consultas.find(req.params.id)
    const consulta = results.rows[0]
    consulta.data = date(consulta.data).iso

    results = await Consultas.profissionaisSelect(req.body)
    const options = results.rows
        if(!consulta) return res.send("consulta não encontrada")

            return res.render("consultas/edit",{consulta, profissionaisOptions:options})

    },
    
async put(req,res){
    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "" && key != "observacao"){
        return res.send("dados faltando")
        }
    }
    await Consultas.update(req.body)
    return res.redirect("/consultas")

    },

async delete(req,res){
    await Consultas.delete(req.body.id)
    return res.redirect ("/consultas")
    }
}

