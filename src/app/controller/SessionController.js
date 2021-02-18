const crypto = require("crypto")
const mailer = require("../lib/configs/mailer")
const User = require("../models/User")
const {hash} = require("bcryptjs")

module.exports = {
    loginForm(req,res){
        return res.render("session/login")
    },

    login(req,res){
        req.session.userId = req.user.id
        return res.redirect("/")
    },

    logout(req,res){
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req,res){
        return res.render("session/forgot-password")
    },
   async forgot(req,res){
        const user = req.user

        try{
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours()+ 1)
    
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to:user.email,
                from:"recsenha0000@hotmail.com",
                subject:"Recuperação de senha",
                html: `<h2>Redefina sua senha </h2>
                <p>clique no link a baixo para recuperar a senha </p>
                <p>
                    <a href ="http://localhost:5000/user/password-reset?token=${token}" target ="_blank">
                    RECUPERAR SENHA
                    </a>
                </p>
                `
            })
    
            return res.render("session/forgot-password",{
                success: "Verifique seu email para resetar sua senha!"
            })

        }catch(err){
            console.error(err)
            return res.render("session/forgot-password",{
                error: "Erro inesperado, tente novamente"
            })
        }
    },
    resetForm(req,res){
        return res.render("session/password-reset",{token:req.query.token})
    },
    async reset(req,res){
        const {senha, token} = req.body
        const user = req.user
        try{

            const newPassword = await hash(senha, 8)
            await User.update(user.id ,{
                senha: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            return res.render("session/login",{
                user:req.body,
                success: "Senha atualizada, faça seu login"
            })
            
        }catch(err){
            console.error(err)
            return res.render("session/password-reset",{
                token,
                error: "Erro inesperado, tente novamente"
            })
        }

    }

}
