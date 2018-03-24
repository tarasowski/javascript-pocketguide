const AuthController = () => {
    
    let roles;
    let user;
    
    const setRoles = (role) => {
        roles = role
        user.roles = role
    }

    const setUser = (inUser) => {
        user = inUser
    }
   
    const isAuthorized = (neededRole) => {
       if (user) {
        return user.isAuthorized(neededRole)
        }
    }

    const isAuthorizedAsync = (neededRole, cb) => {
        setTimeout(() => cb(roles.indexOf(neededRole) >= 0), 0)
    }

    function isAuthorizedPromise(neededRole, cb) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(roles.indexOf(neededRole) >= 0) }, 0);
        })
    }

    const getIndex = (req, res) => {
        res.render('index')
    }

    return {setRoles, isAuthorized, isAuthorizedAsync, isAuthorizedPromise, getIndex, setUser}
}

module.exports = AuthController()