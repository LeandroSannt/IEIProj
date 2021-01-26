var {age, date} =require("../lib/configs/utils")
var Consultas =require("../models/consultas")

module.exports={
    
 async index(req,res){
     
    let results = await Consultas.all(req.body)
    const consultas = results.rows

    return res.render("consultas/index",{consultas}) 
    },

async create(req,res){
    return res.render("consultas/create")
    },
    
async post(req,res){

    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "" && key != "observacao"){
        return res.send("dados faltando")
        }
    }
    let results = await Consultas.create(req.body)
    const consultaId = results.rows[0].id

    return res.redirect(`/consultas`)

    },

async show(req,res){ 
    let results = await Consultas.find(req.params.id)
    consulta =results.rows[0]

    if(!consulta) return res.send("consulta não encontrada")
    
    return res.render(`consultas/show`,{consulta})

    },
    
async edit(req,res){
    let results = await Consultas.find(req.params.id)
    const consulta = results.rows[0]
        if(!consulta) return res.send("consulta não encontrada")

    return res.render("consultas/edit",{consulta})

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

