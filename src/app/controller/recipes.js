var {age, date} =require("../lib/configs/utils")
const { findRecipes } = require("../models/recipesModel")
var Recipes =require("../models/recipesModel")
var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")

module.exports={
    
async index(req,res){
    let results = await Recipes.all(req.body)
    const recipes = results.rows

        return res.render("admin/recipes/index",{recipes})
    },

async create(req,res){
    let results = await Recipes.chefSelectOptions(req.body)
    const options = results.rows
        return res.render("admin/recipes/create",{chefOptions:options})
    },
    
async post(req,res){
                 //validação dos campos 
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") 
                    return res.send("Dados Faltando")
                }
                if(req.files.length == 0)
                    return res.send("envie todas as imagens")

                //criando receita    

                let results = await Recipes.create(req.body)
                const recipeId = results.rows[0].id
         
                //vincular foto a receita
                let filesPromise = req.files.map(file => Files.create(file))
                results = await Promise.all(filesPromise)
            
                const recipeFilesPromise = results.map(file => RecipeFiles.create({    
                    recipe_id:recipeId,
                    file_id:file.rows[0].id
                }));
                results = await Promise.all(recipeFilesPromise)
                    return res.redirect(`/admin/recipes/details/${recipeId}`)
    },

async details(req,res){ 
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("recipe not found")
        recipe.created_at = date(recipe.created_at).format

                    return res.render("admin/recipes/details", {recipe})
    },
    
async edit(req,res){
    let results = await Recipes.find(req.params.id)
    const recipes = results.rows[0]
        if(!recipes) return res.send("Receita não encontrada")
        //pegar o chef que foi selecionado
        results = await Recipes.chefSelectOptions(req.body) 
        const chefOptions = results.rows

        //colocar endereço correto das imagens 
        results = await Recipes.files(recipes.id)
        let files = results.rows
        files=  files.map(file=>({
            ...file,
            src:`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
       }))
             return res.render("admin/recipes/edit", {recipes, chefOptions,files})
    },
    
async put(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "" && key !=  "removed_files") 
            return res.send("Dados Faltando")
        }
       await Recipes.update(req.body)
        
       if(req.body.removed_files){
       const removedFiles = req.body.removed_files.split(",")
       const lastIndex = removedFiles.length -1
       removedFiles.splice(lastIndex, 1)

       const removedFilesPromise = removedFiles.map(id =>Files.delete(id))

       await Promise.all(removedFilesPromise)
       return res.redirect(`/admin/recipes`)  
       }
    },

  
async delete(req,res){
    await Recipes.delete(req.body.id)
        return res.redirect ("/admin/recipes")
    }
}

