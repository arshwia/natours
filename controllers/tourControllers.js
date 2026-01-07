const { stat } = require('fs');
const { Tour } = require('../modules/tourModule');

const getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedfields = ['page', 'sort', 'limit', 'fields'];
        excludedfields.forEach((el) => delete queryObj[el]);

        // عوض گردن مفادیر
        const replacements = {
            gte: '$gte',
            gt: '$gt',
            lte: '$lte',
            lt: '$lt',
        };

        let querySrt = JSON.stringify(queryObj);
        Object.keys(replacements).forEach((key) => {
            querySrt = querySrt.replace(
                new RegExp(`\\b${key}\\b`, 'g'),
                replacements[key]
            );
        });

        const query = Tour.find(JSON.parse(querySrt));

        const tours = await query;

        if (tours.length === 0) {
            throw new Error('No results to display.');
        }

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
            message: err.message,
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
            message: err,
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
            message: err,
        });
    }
};

const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

module.exports = {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
};
