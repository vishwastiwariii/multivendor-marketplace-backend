const authorizedRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            res.json("Invalid Access Credentials")
        }
        next()
    }
}



module.exports = {
    authorizedRoles
}