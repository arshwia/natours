const fs = require('fs');
const express = require('express');
const { toUSVString } = require('util');

const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'this tour is not found💔',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err) res.status(404).send(err);

            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour,
                },
            });
        }
    );
});

const port = 3000;
app.listen(port, () => {
    console.log(`app runing on port : ${port}`);
});
