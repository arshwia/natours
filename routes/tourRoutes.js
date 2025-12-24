const express = require('express');

const {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
} = require('../controllers/tourControllers.js');

const router = express.Router();

router.route('/').get(getAllTours).post(creatTour);

router.route('/:name').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
