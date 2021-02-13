const express = require("express")
const routes =express.Router()
const financeiro = require("../app/controller/financeiro")

const { onlyUser} = require("../app/middlewares/session")

routes.get("/", onlyUser,financeiro.index); 
routes.get("/profissional-consultas/:id", onlyUser,financeiro.financeiroConsultas); 

module.exports = routes
