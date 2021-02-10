const express = require("express")
const routes =express.Router()
const SessionController = require("../app/controller/SessionController")
const UserController = require("../app/controller/UserController")

const Validator = require("../app/validators/user")

  //login
  routes.get("/login",SessionController.loginForm)
  //routes.post("/login",SessionController.login)
  routes.post("/logout",SessionController.logout)

  //reset poassword

  //routes.get("/forgot-password",SessionController.forgotForm)
  //routes.get("/password-reset",SessionController.resetForm)
  //routes.post("/forgot-password",SessionController.forgot)
  //routes.post("/password-reset",SessionController.reset)

//user registro

routes.get('/registro', UserController.registerForm)
routes.post('/registro',Validator.post, UserController.post)

routes.get('/index',Validator.show, UserController.show)
routes.put('/',Validator.update, UserController.update)
//routes.delete('/', UserController.delete)

module.exports = routes
