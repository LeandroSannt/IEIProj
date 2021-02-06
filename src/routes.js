const express = require("express")
const routes =express.Router()
const consultas = require("./app/controller/consultas")
const profissionais = require("./app/controller/profissionais")
const financeiro = require("./app/controller/financeiro")

routes.get("/", function (req,res){
  return res.redirect("consultas")
})

/*=========Consultas========*/

routes.get("/consultas", consultas.index);
routes.get("/consultas/total-consultas-do-dia", consultas.total);
routes.get("/consultas/total-consultas-de-nutricao", consultas.nutricao);
routes.get("/consultas/total-consultas-de-piscicologia", consultas.piscicologia);
routes.get("/consultas/agendamento", consultas.create);
routes.get("/consultas/detalhes/:id", consultas.show); 
routes.get("/consultas/detalhes/:id/edit", consultas.edit); 

routes.post("/consultas", consultas.post); 
routes.put("/consultas",consultas.put);
routes.delete("/consultas", consultas.delete); 

/*=========Profissionais========*/

routes.get("/profissionais", profissionais.index); 
routes.get("/profissionais/cadastro", profissionais.create); 
routes.get("/profissionais/detalhes/:id", profissionais.show);
routes.get("/profissionais/detalhes/:id/edit", profissionais.edit);

routes.post("/profissionais", profissionais.post); 
routes.put("/profissionais", profissionais.put); 
routes.delete("/profissionais", profissionais.delete);


/*==========Financeiro==========*/ 
routes.get("/financeiro", financeiro.index); 
routes.get("/financeiro/profissional-consultas/:id", financeiro.financeiroConsultas); 

routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  });


module.exports = routes


