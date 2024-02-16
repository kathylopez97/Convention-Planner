const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const handlebars = require('handlebars')

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('homepage');
});

app.get('/createevent', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/createEvent.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/login.html'));
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT} `)
);

// main.handlebars has the default info
// homepage.handlebars has info for the body, maybe the generated text
// controllers / homeRouts.js is where we can do the login api.
// public / css || public / script.js should be the place where the css and scripts go
// Can change this up later, just wanted basic working. Still needs a lot of work
