// CLEAN UP USER OBJECTS RES.JSON NO NO NO !

const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const saltRounds = 10;

const userNotFound = next => {
  console.log('USERNOTFOUND');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

router.get('/me', async (req, res, next) => {
  console.log('req.session is ', req.session);
  console.log('req.session.userId is ', req.session.userId);
  try {
    if (!req.session.userId) {
      console.log('IF');
      res.json({ loggedIn: false });
    } else {
      console.log('ELSE');
      const user = await User.findByPk(req.session.userId);
      user
        ? res.json({ user: { id: user.id }, loggedIn: true })
        : userNotFound(next);
    }
  } catch (err) {
    console.log('CATCH');
    userNotFound(next);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    console.log('req.session is ', req.session);
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.redirect('/');
      // res.status(401).send('User not found') from FSA
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result === true) {
          req.session.userId = user.id;
          res.json(user);
        } else {
          const err = new Error('Incorrect email or password');
          err.status = 401;
        }
      });
    }
  } catch (err) {
    console.log('err is in the catch');
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    console.log('req.body is ', req.body);
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_num: req.body.phone_num,
        email: req.body.email,
        password: hash,
      });
      if (newUser) {
        // req.login(user, er r => {if (err) next(err) else res.json(user)}) from FSA;
        res.redirect('/home');
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/logout', async (req, res, next) => {
  try {
    req.session = null;
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
