var {age, date} =require("../lib/configs/utils")
var Recipes =require("../models/recipesModel")
var RecipeFiles =require("../models/recipeFiles")
var Files =require("../models/file")

module.exports={
    
async index(req,res){

        return res.render("consultas/index")
    },

async create(req,res){

    },
    
async post(req,res){

    },

async details(req,res){ 

    },
    
async edit(req,res){

    },
    
async put(req,res){

    },

  
async delete(req,res){

    }
}

