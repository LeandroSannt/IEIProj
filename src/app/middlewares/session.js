function onlyUser(req,res,next){
    if(!req.session.userId)
        return res.redirect("/user/login")

    next()
}

function isLoggedRedirect(req,res,next){
    if(req.session.userId)
        return res.redirect("/user")
}

module.exports = {
    onlyUser,
    isLoggedRedirect
    
}