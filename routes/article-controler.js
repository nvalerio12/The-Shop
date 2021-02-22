const express = require('express');
const router = express.Router();
// import database
const db = require('../models');

router.get('/allposts', async (req, res) =>{
    const allPosts = await db.article.findAll() 
    console.log('its working')
    // console.log(allPost[0].dataValues.title)
    res.render('auth/allposts', { allPosts })
}); 

router.post('/allposts', async (req, res) => {
  try { 
      console.log(req.body.title)
    const createdArticle = await db.article.create({ 
        title: req.body.title,
        description: req.body.description
    })
    const newPost = createdArticle.get()
    console.log(newPost)
    res.redirect('/article/allposts')
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;