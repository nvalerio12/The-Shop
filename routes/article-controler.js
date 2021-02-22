const express = require('express');
const router = express.Router();
// import database
const db = require('../models');

router.get('/allposts', async (req, res) =>{
    const allPosts = await db.article.findAll() 
    res.render('allPosts', { allPosts })
}); 

router.post('/article', async (req, res) => {
  try { 
      console.log(req.body.title)
    const createdArticle = await db.article.create({ 
        title: req.body.title,
        description: req.body.description
    })
    const newPost = createdArticle.get()
    console.log(newPost)
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
});


module.exports = router;