var {age, date} =require("../lib/configs/utils")
var Profissionais =require("../models/profissionais")

module.exports={
    
 async index(req,res){

   const {filter} = req.query

    if(filter){
        let results = await Profissionais.filter(filter)
        const profissionais = results.rows
        return res.render("profissionais/index",{profissionais}) 

    }else{
        let results = await Profissionais.all(req.body)
        const profissionais = results.rows
        return res.render("profissionais/index",{profissionais}) 

    }


    },

async create(req,res){
    return res.render("profissionais/create")
    },
    
async post(req,res){

    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "" && key){
        return res.send("dados faltando")
        }
    }
    let results = await Profissionais.create(req.body)
    const profissionalId = results.rows[0].id

    return res.redirect(`/profissionais`)

    },

async show(req,res){ 
    let results = await Profissionais.find(req.params.id)
    profissional =results.rows[0]

    if(!profissional) return res.send("profissional não encontrada")
    
    return res.render(`profissionais/show`,{profissional})

    },
    
async edit(req,res){
    let results = await Profissionais.find(req.params.id)
    const profissional = results.rows[0]
        if(!profissional) return res.send("profissional não encontrada")

    return res.render("profissionais/edit",{profissional})

    },
    
async put(req,res){
    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "" && key ){
        return res.send("dados faltando")
        }
    }
    await Profissionais.update(req.body)
    return res.redirect("/profissionais")

    },

async delete(req,res){
    await Profissionais.delete(req.body.id)
    return res.redirect ("/profissionais")
    }
}

