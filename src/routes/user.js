const express = require("express")
const routes =express.Router()
const SessionController = require("../app/controller/SessionController")
const UserController = require("../app/controller/UserController")

const UserValidator = require("../app/validators/user")
const SessionValidator = require("../app/validators/session")

  //login
  routes.get("/login",SessionController.loginForm)
  routes.post("/login",SessionValidator.login,SessionController.login)
  routes.post("/logout",SessionController.logout)

  //reset poassword

  //routes.get("/forgot-password",SessionController.forgotForm)
  //routes.get("/password-reset",SessionController.resetForm)
  //routes.post("/forgot-password",SessionController.forgot)
  //routes.post("/password-reset",SessionController.reset)

//user registro

routes.get('/registro', UserController.registerForm)
routes.post('/registro',UserValidator.post, UserController.post)

routes.get('/index',UserValidator.show, UserController.show)
routes.put('/',UserValidator.update, UserController.update)
//routes.delete('/', UserController.delete)

module.exports = routes
