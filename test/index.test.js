// var expect = require('chai').expect;
// var request = require('supertest');
// var app = require('../server');

// describe('App', function() {
//   it('should return a 200 response', function(done) {
//     request(app).get('/').expect(200, done);
//   });
// });
const axios = require('axios');

axios.get('https://wikiapi.p.rapidapi.com/api/v1/wiki/sports/nba/team/info/chicago_bulls')
  .then(response => {
    console.log(response.data)
  });