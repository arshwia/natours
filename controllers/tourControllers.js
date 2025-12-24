const { Tour } = require('../modules/tourModule');

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'error message: invalid data sent!',
        });
    }
};

const getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            name: tour.name,
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error message: invalid data sent!',
        });
    }
};

const creatTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error message: invalid data sent!',
        });
    }
};

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: {
            tour: 'nononono',
            body: req.body,
        },
    });
};

const deleteTour = (req, res) =>
    res.status(200).json({
        status: 'ok',
        data: {
            tour: 'nononono',
            body: req.body,
        },
    });

module.exports = {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
};
