require('dotenv').config();

const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig'); 
const flash = require('connect-flash');
const axios = require('axios');
const app = express();


app.set('view engine', 'ejs');

// Session 
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
const { response } = require('express');

// MIDDLEWARE
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// Session Middleware
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));

// Passport
app.use(passport.initialize());
app.use(passport.session()); 

// Flash 
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./routes/auth'));
// app.use('/article', require('./routes/article-controler'));

app.get('/', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://newscafapi.p.rapidapi.com/apirapid/news/sports/',
    params: {q: 'news'},
    headers: {
      'x-rapidapi-key': '80dc85bf40msh8a4e6b00e5b37f2p1c2e55jsn47af76417f6b',
      'x-rapidapi-host': 'newscafapi.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.render('index', { data: response.data })
  }).catch(function (error) {
    console.error(error);
  });
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// router.delete('/allposts/:idx', (req, res) => {
//   const deletePost = fs.readFileSync()
// });


//Port
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;

