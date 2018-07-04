const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const content = require('./aboutContent');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
hbs.registerHelper('ageStatus', (age) => {
  if (age >= 65) return '(Senior)';
  else if (age >= 18) return '(Adult)';
  else return '(Minor)';
});


app.use((req, res, next) => {
  let now = new Date().toString();
  const log = `${now}:  method: ${req.method}, route: ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('The log could not be appended to the server.log file');
  });
  console.log(log);
  next()
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     title: 'Maintenance'
//   });
// });
app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
  //response.send('<h1>My first Server</h1>');
  response.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: 'Hello EveryBody!! <br>Have Fun',
  });
});

app.get('/about', (request, response) => {
  //response.send('<h2>About Page</h2>');
  response.render('about.hbs', content);
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to manage request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects Page',
    projects: [
      'Notes CLI App',
      'Weather CLI App',
      'NodeServer Web App'
    ]
  });
});

app.listen(port, () => {
  console.log(`The server is up and running at port: ${port}`);
});