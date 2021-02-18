const express = require('express');
const router = express.Router();

// import database
const db = require('../models');

router.post('/', async (req, res) => {
  try { 
      console.log(req.body.title)
    const createdArticle = await db.article.create({ 
        title: req.body.title,
        description: req.body.description
    })
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;