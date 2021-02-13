const express = require("express")
const routes =express.Router()
const consultas = require("../app/controller/consultas")

const { onlyUser} = require("../app/middlewares/session")

routes.get("/",onlyUser, consultas.index);
routes.get("/total-consultas-do-dia",onlyUser, consultas.total);
routes.get("/total-consultas-de-nutricao",onlyUser, consultas.nutricao);
routes.get("/total-consultas-de-piscicologia",onlyUser, consultas.piscicologia);
routes.get("/agendamento", onlyUser,consultas.create);
routes.get("/detalhes/:id",onlyUser, consultas.show); 
routes.get("/detalhes/:id/edit", onlyUser,consultas.edit); 

routes.post("/", onlyUser, consultas.post); 
routes.put("/", onlyUser,consultas.put);
routes.delete("/", onlyUser, consultas.delete); 


module.exports = routes
