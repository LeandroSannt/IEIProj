function onlyUser(req,res,next){
    if(!req.session.userId)
        return res.redirect("/user/login")

    next()
}

function isLoggedRedirect(req,res,next){
    if(req.session.userId)
        return res.redirect("/user")
}

function redirectNotPermission(req,res,next){
    if(req.session.userId != 24){
        return res.render("parts/not-found")
    }else{
        next()
    }
}

module.exports = {
    onlyUser,
    isLoggedRedirect,
    redirectNotPermission
    
}