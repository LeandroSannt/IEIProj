const express = require("express")
const routes =express.Router()
const profissionais = require("../app/controller/profissionais")

routes.get("/", profissionais.index); 
routes.get("/cadastro", profissionais.create); 
routes.get("/detalhes/:id", profissionais.show);
routes.get("/detalhes/:id/edit", profissionais.edit);

routes.post("/", profissionais.post); 
routes.put("/", profissionais.put); 
routes.delete("/", profissionais.delete);

module.exports = routes
