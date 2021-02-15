const express = require("express")
const routes =express.Router()
const financeiro = require("../app/controller/financeiro")

const { onlyUser} = require("../app/middlewares/session")

routes.get("/", onlyUser,financeiro.index); 
routes.get("/consultas-abertas", onlyUser,financeiro.consultasAbertas); 
routes.get("/consultas-fechadas", onlyUser,financeiro.consultasFechadas); 
routes.get("/profissional-consultas/:id", onlyUser,financeiro.financeiroConsultas); 

module.exports = routes
