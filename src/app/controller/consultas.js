var {date} =require("../lib/configs/utils")
var Consultas =require("../models/consultas")

module.exports={
    
 async index(req,res){
     

    const {filter} = req.query

    console.log(req.query)

    if (filter){
        let results = await Consultas.all(req.body)
        const consultas = results.rows
        consultas.data = date(consultas.data).format

        results = await Consultas.totalConsultas(filter)
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

        results = await Consultas.totalConsultas(req.body)
        const totalConsultas = results.rows

        results = await Consultas.piscicologia(req.body)
        const totalPiscicologia = results.rows
    
        results = await Consultas.nutricao(req.body)
        const totalNutricao = results.rows
    
            return res.render("consultas/index",{consultas,totalConsultas,totalPiscicologia,totalNutricao}) 

        }
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
    const consultaId = results.rows[0].id

    return res.redirect(`/consultas`)
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

