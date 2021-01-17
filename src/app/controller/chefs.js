var {age, date} =require("../lib/configs/utils")
var Chefs =require("../models/chefsModel")

module.exports={
    
async index(req,res){
        results =await Chefs.all(req.body)
        const chefs = results.rows
            return res.render("admin/chefs/index",{chefs})    
    },

create(req,res){
        return res.render("admin/chefs/create")
    },
    
async post(req,res){
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") 
                    return res.send("Dados Faltando")
                }

                let results = await Chefs.create(req.body)
                const chefId = results.rows[0].id
                    return res.redirect(`/admin/chefs/details/${chefId}`)
    },
    
async details(req,res){ 
    let results = await Chefs.find(req.params.id)
    const chefs = results.rows[0]
        if(!chefs) return res.send("chef não encontrado")

        results = await Chefs.findRecipes(req.params.id)
        const recipes =results.rows[0]

        chefs.created_at = date(chefs.created_at).format
        
                return res.render("admin/chefs/details",{chefs,recipes})    
    },

async edit(req,res){
        let results = await Chefs.find(req.params.id)
        const chefs = results.rows[0]
            if(!chefs) return res.send("chef não encontrado")
                return res.render("admin/chefs/edit",{chefs})    
    },

async put(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send("Dados Faltando")
        }
        await Chefs.update(req.body)
            return res.redirect(`/admin/chefs`)  

    },
    
async delete(req,res){
    await Chefs.delete(req.body.id)
            return res.redirect ("/admin/chefs")  
    }
}


        
