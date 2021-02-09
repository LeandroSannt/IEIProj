const express = require("express")
const routes =express.Router()
const consultas = require("../app/controller/consultas")



routes.get("/", consultas.index);
routes.get("/total-consultas-do-dia", consultas.total);
routes.get("/total-consultas-de-nutricao", consultas.nutricao);
routes.get("/total-consultas-de-piscicologia", consultas.piscicologia);
routes.get("/agendamento", consultas.create);
routes.get("/detalhes/:id", consultas.show); 
routes.get("/detalhes/:id/edit", consultas.edit); 

routes.post("/", consultas.post); 
routes.put("/",consultas.put);
routes.delete("/", consultas.delete); 


module.exports = routes
