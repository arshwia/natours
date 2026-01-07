const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// req.body
app.use(express.json());

app.use(morgan('dev'));

// برای ابجکت کردن ریکویستی که میزنیم داخل یو ار ال فولدر 8 پارت 15
app.set('query parser', 'extended');

app.use(express.static(`./public`));

app.use((req, res, next) => {
    req.reqTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
