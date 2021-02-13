const express = require("express")
const routes =express.Router()
const profissionais = require("../app/controller/profissionais")

const { onlyUser} = require("../app/middlewares/session")

routes.get("/",onlyUser, profissionais.index); 
routes.get("/cadastro", onlyUser,profissionais.create); 
routes.get("/detalhes/:id",onlyUser, profissionais.show);
routes.get("/detalhes/:id/edit", onlyUser,profissionais.edit);

routes.post("/", onlyUser, profissionais.post); 
routes.put("/", onlyUser, profissionais.put); 
routes.delete("/", onlyUser, profissionais.delete);

module.exports = routes
