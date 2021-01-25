const express = require("express")
const routes =express.Router()
const consultas = require("./app/controller/consultas")

routes.get("/", function (req,res){
  return res.redirect("consultas")
})


/*=========RECIPES========*/

routes.get("/consultas", consultas.index); // Mostrar a lista de receitas
routes.get("/consultas/agendamento", consultas.create); // Mostrar formulário de nova receita
routes.get("/consultas/detalhes/:id", consultas.show); // Exibir detalhes de uma receita
routes.get("/consultas/detalhes/:id/edit", consultas.edit); // Mostrar formulário de edição de receita

routes.post("/consultas", consultas.post); // Cadastrar nova receita
routes.put("/consultas",consultas.put); // Editar uma receita
/*routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
*/
/*=========CHEFS========*/

/*routes.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/details/:id", chefs.details); // Exibir detalhes de uma receita
routes.get("/admin/chefs/details/:id/edit", chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita

*/
routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  });


module.exports = routes


