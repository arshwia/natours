const { Tour } = require('../modules/tourModule');

const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'this is a bad request💔 missing name or price',
        });
    }

    next();
};

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: {
            tour: 'nononono',
            body: req.body,
        },
    });
};

const getTour = (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: {
            tour: 'nononono',
            body: req.body,
        },
    });
};

const creatTour = (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: {
            tour: 'nononono',
            body: req.body,
        },
    });
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
    checkBody,
};
