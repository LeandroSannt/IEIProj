const express = require("express")
const routes =express.Router()
const financeiro = require("../app/controller/financeiro")

routes.get("/", financeiro.index); 
routes.get("/profissional-consultas/:id", financeiro.financeiroConsultas); 

module.exports = routes
