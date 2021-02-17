const express = require("express")
const routes =express.Router()
const financeiro = require("../app/controller/financeiro")

const { onlyUser,redirectNotPermission} = require("../app/middlewares/session")

routes.get("/", redirectNotPermission, onlyUser,financeiro.index); 
routes.get("/consultas-abertas", redirectNotPermission, onlyUser,financeiro.consultasAbertas); 
routes.get("/consultas-fechadas", redirectNotPermission, onlyUser,financeiro.consultasFechadas); 
routes.get("/profissional-consultas/:id", redirectNotPermission, onlyUser,financeiro.financeiroConsultas); 

module.exports = routes
