const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log(
        'Hello from the middelware 😁😁😁'
    );
    next();
});

app.use((req, res, next) => {
    req.reqTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port : ${port}`);
});
