const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./middleware');


const { 
    createUser,
    getUserByUsername,
    getUser,
    getUserProfile,
    editUserProfile,
    editUserPassword,
    getUserByEmail,
    editUserEmail
} = require('../db'); 

const { JWT_SECRET } = process.env;

// POST /api/users/login
userRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password'
    });
  }

  try {
    const user = await getUser({username, password});
    if(!user) {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    } else {
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
      res.send({ user, username, message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
userRouter.post('/register', async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short! Must be 8 characters or longer'
      });
    } else {
      const user = await createUser({
        username,
        email,
        password
      });
      if (!user) {
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.',
        });
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "you're signed up!", token });
      }
    }
  } catch (error) {
    next(error)
  }
});

// GET /api/users/me
userRouter.get('/me',  async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error)
  }
});




// WORKING -------- 

// GET /api/users/profile
userRouter.get('/profile/:id', async (req, res, next) => {
  try {
    const user = await getUserProfile(req.params.id);
    res.send(user);
  } catch (error) {
    next(error)
  }
});

// PATCH /api/users/profile
userRouter.patch('/profile', requireUser, async (req, res, next) => {
  try {

    // Is the request being made by the user
    if(req.body.id !== req.user.id){
      next({
        message: "User does't have access to this request.",
      });
    }

    const user = await editUserProfile(req.body);
    res.send(user);
  } catch (error) {
    next(error)
  }
});

// PATCH /api/users/email
userRouter.patch('/email', requireUser, async (req, res, next) => {
  try {

    // if not the same user
    if(req.body.id !== req.user.id){
      next({
        message: "User does't have access to this request.",
      });
    }

    // If correct password sent
    const user = await getUser({username: req.user.username, password: req.body.password});
    if(!user) {
      next({
        message: 'Password is incorrect.',
      });
    }

    // If a user already has that email
    const queriedUser = await getUserByEmail(req.body.newEmail);
    if (queriedUser) {
      next({
        message: 'A user with that email already exists'
      });
    } 

    const updatedUser = await editUserEmail(req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error)
  }
});

// PATCH /api/users/password
userRouter.patch('/password', requireUser, async (req, res, next) => {
  try {

    // Is the request being made by the user
    if(req.body.id !== req.user.id){
      next({
        message: "User does't have access to this request.",
      });
    }

    console.log('req.body.password: ', req.body.password);

    // If correct password sent
    const user = await getUser({username: req.user.username, password: req.body.password});
    console.log('user: ', user);
    if(!user) {
      next({
        message: 'Password is incorrect.',
      });
    }

    // If new password to short
    if (req.body.newPassword.length < 8) {
      next({
        message: 'Password Too Short! Must be 8 characters or longer'
      });
    } 

    const updatedUser = await editUserPassword(req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error)
  }
});

module.exports = userRouter;
