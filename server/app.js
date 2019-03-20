require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const pricesRoutes = require('./routes/prices');
const holdingRoutes = require('./routes/holdings');
const actionRoutes = require('./routes/action');
const historyRoutes = require('./routes/history')

const models = require('./models');
const session = require('express-session')
require('dotenv').config();
const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
// app.use(express.static(path.join(__dirname, '../public/')));
app.use(bodyParser.json());
// Route definitions
app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/prices',pricesRoutes);
app.use('/holdings', holdingRoutes);
app.use('/action', actionRoutes);
app.use('/history', historyRoutes);

models.sequelize
  .authenticate()
  // .sync({force: true})
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(process.env.PORT || 8080);

