const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const db = require("./db")

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: 'sucodelimao',
    //se a sessao vai ficar logada quando atualizar
    resave: false,
    saveUninitialized: false,
    cookie:{
        //retorna em milisegundos
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})