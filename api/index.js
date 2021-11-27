const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db');

apiRouter.use(async (req, res, next) => {

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {

        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id);
                next();
            }  
        } catch (error) {
            next(error);
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

apiRouter.get('/health', async (req, res, next) =>{
    try{
        res.send({message: "API Healthy"});
    }catch(error){
        next(error);
    }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const wishlistRouter = require('./wishlist');
apiRouter.use('/wishlist', wishlistRouter);

module.exports = apiRouter
