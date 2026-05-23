const authorizedRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.json("Invalid Access Credentials")
        }
        next()
    }
}



module.exports = {
    authorizedRoles
}