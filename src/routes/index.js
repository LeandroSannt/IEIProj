const express = require("express")
const routes = express.Router()

const consultas = require('./consultas')
const profissionais = require('./profissionais')
const financeiro = require('./financeiro')
const user = require('./user')

routes.use("/consultas",consultas)
routes.use("/profissionais",profissionais)
routes.use("/financeiro",financeiro)
routes.use("/user",user)

routes.get("/", function (req,res){
  return res.redirect("consultas")
})

routes.use('/consultas',consultas)
routes.use('/profissionais',profissionais)
routes.use('/financeiro',financeiro)
routes.use('/user',user)

routes.get('not-found', function(req, res) {
    res.render("/views/not-found");
  })

module.exports = routes


