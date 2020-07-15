const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

//load config file, provide path
dotenv.config({ path: './config/config.env' });

//passport config
require('./config/passport')(passport); //passing passport in , this can be caught in passport.js function
//connection to MongoDB Atlas
connectDB();

const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

//handlebars helper
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs');

//handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

//sessions
app.use(
  session({
    secret: 'aravind',
    resave: false, //we don't want to save a session if nothing is modified
    saveUninitialized: false, // don't create a session until something is stored
    // cookie: { secure: true }, this works only with https://
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//passport middleware
//in order for passport to work with sessions we need to implement express-session
app.use(passport.initialize());
app.use(passport.session());

//set global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// static folder declaration
app.use(express.static(path.resolve(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}  `
  )
);
