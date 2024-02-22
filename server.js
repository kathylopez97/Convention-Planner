const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const handlebars = require('handlebars');
const multer = require('multer');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    // maxAge sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one hour. The time should be given in milliseconds.
    maxAge: 60 * 60 * 1000,
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Needs to be in order. Middleware runs first
app.use(routes);

// Potentiialy move
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.creatorID + '-eventImage' + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage });

app.post('/api/events/:creatorID', upload.single('eventImage'), async (req, res) => {
  try {
    const eventData = {
      creatorID: req.params.creatorID,
    };
    const savedEvent = await saveEvent(eventData);
    res.json({ message: 'Event created successfully', event: savedEvent })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error occured' });
  }
  
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT} `)
  )
});

// main.handlebars has the default info
// homepage.handlebars has info for the body, maybe the generated text
// controllers / homeRouts.js is where we can do the login api.
// public / css || public / script.js should be the place where the css and scripts go
// Can change this up later, just wanted basic working. Still needs a lot of work
