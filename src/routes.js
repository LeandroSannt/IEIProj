const express = require("express")
const routes =express.Router()
const consultas = require("./app/controller/consultas")
const profissionais = require("./app/controller/profissionais")

routes.get("/", function (req,res){
  return res.redirect("consultas")
})

/*=========Consultas========*/

routes.get("/consultas", consultas.index);
routes.get("/consultas/agendamento", consultas.create);
routes.get("/consultas/detalhes/:id", consultas.show); 
routes.get("/consultas/detalhes/:id/edit", consultas.edit); 

routes.post("/consultas", consultas.post); 
routes.put("/consultas",consultas.put);
routes.delete("/consultas", consultas.delete); 

/*=========Profissionais========*/

routes.get("/profissionais", profissionais.index); 
routes.get("/profissionais/cadastro", profissionais.create); 
routes.get("/profissionais", profissionais.show);
routes.get("/profissionais/detalhes/:id/edit", profissionais.edit);

routes.post("/profissionais", profissionais.post); 
routes.put("/profissionais", profissionais.put); 
routes.delete("/profissionais", profissionais.delete);

routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  });


module.exports = routes


