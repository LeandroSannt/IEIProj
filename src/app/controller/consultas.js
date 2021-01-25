var {age, date} =require("../lib/configs/utils")
var Consultas =require("../models/consultas")


module.exports={
    
 async index(req,res){
        return res.render("consultas/index")
    },

async create(req,res){
    return res.render("consultas/create")


    },
    
async post(req,res){

    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == ""){
        return res.send("dados faltando")
        }
    }
    let results = await Consultas.create(req.body)
    const consultaId = results.rows[0].id

        return res.redirect("consultas ",{consultaId})

    },

async details(req,res){ 
    return res.render("consultas/show")

    },
    
async edit(req,res){
    return res.render("consultas/edit")

    },
    
async put(req,res){

    },

async delete(req,res){

    }
}

