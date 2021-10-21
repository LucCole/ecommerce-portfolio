function requireUser(req, res, next){

  console.log('requireUser - req.user: ', req.user);
    if(!req.user){
        res.status(401);
        next({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action',
        });
    }else{
        next();
    }
}

module.exports = {
    requireUser
};