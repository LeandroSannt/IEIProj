const express = require("express")
const routes =express.Router()
const profissionais = require("../app/controller/profissionais")

const { onlyUser, redirectNotPermission} = require("../app/middlewares/session")

routes.get("/",onlyUser, profissionais.index); 
routes.get("/cadastro",redirectNotPermission,onlyUser,profissionais.create); 
routes.get("/detalhes/:id",redirectNotPermission,onlyUser, profissionais.show);
routes.get("/detalhes/:id/edit",redirectNotPermission,onlyUser,profissionais.edit);

routes.post("/",redirectNotPermission, onlyUser, profissionais.post); 
routes.put("/",redirectNotPermission, onlyUser, profissionais.put); 
routes.delete("/",redirectNotPermission, onlyUser, profissionais.delete);

module.exports = routes
