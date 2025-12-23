const express = require('express');

const {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
    checkBody,
} = require('../controllers/tourControllers.js');

const router = express.Router();

router.route('/').get(getAllTours).post(checkBody, creatTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
