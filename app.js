const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const cafeRoutes = require('./routes/cafe');
const categoryRoutes = require('./routes/category');
const commentsRoutes = require('./routes/comment');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser:true })
    .then(() => console.log('MongoDB connect'))
    .catch(error => console.log(error))

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/cafe', cafeRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/comment', commentsRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;