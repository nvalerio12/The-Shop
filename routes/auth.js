const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();
const Article = require('./../models/article');

// import database
const db = require('../models');

router.get('/new', (req, res) => {
  res.render('auth/new')
});

router.get('/signup', (req, res) => {
  res.render('auth/signup'); // this is a form
});

router.get('/login', (req, res) => {
  res.render('auth/login'); // this is a form
});

router.get('/logout', (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash('success', 'Logging out... See you next time!');
  res.redirect('/');
});

router.get('/:id', (req, res) => {

});

// router.post('/', async (req, res) => {
//   const article = new Article({
//     title: req.boby.title,
//     description: req.body.description
//   })
//   try { 
//     await article.save()
//     res.redirect(`/auth/${auth.id}`)
//   } catch (e) {
//       res.render('auth/new', { article: article })
//   }
// });

// router.post('/', async (req, res) => {
//   try { 
//     const articleToCreate = {
//       title: req.boby.title,
//       description: req.body.description
//     }
//     const createdArticle = await Article.create(articleToCreate)
//     console.log('here is created art');
//     console.log(createdArticle);
//     res.redirect(`/auth`)
//   } catch (e) {
  //       res.render('auth/new', { article: article })
  //   }
  // });

// What routes do we need (post routes)
router.post('/signup', (req, res) => {
  // we now have access to the user info (req.body);
  // console.log(req.body);
  const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object (req.body)
  db.user.findOrCreate({
    where: { email },
    defaults: { name, password }
  })
  .then(([user, created]) => {
    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`${user.name} was created....`);
      // flash messages
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${user.name}. Account was created and logging in...`
      }
      // passport authenicate
      passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  })
  .catch(error => {
    console.log('**************Error');
    console.log(error);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/auth/signup');
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect' 
}));

module.exports = router;