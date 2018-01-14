const path = require('path');
const express = require('express');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));

// hbs.registerPartials(path.join(__dirname, '../views/partials'));
// app.set('view engine', 'hbs');
//
// hbs.registerHelper('getCurrentYear', () => {
//   return new Date().getFullYear()
// });
//
// hbs.registerHelper('screamIt', (text) => {
//   return text.toUpperCase();
// });
//
// app.get('/', (req, res) => {
//   res.render('home.hbs', {
//     pageTitle: 'Home Page',
//     welcomeMessage: 'Welcome to my website'
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.render('about.hbs', {
//     pageTitle: 'About Page'
//   });
// });
//
// // /bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'Unable to handle request'
//   });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
