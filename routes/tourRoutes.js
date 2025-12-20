const express = require('express');

const {
    getAllTours,
    getTour,
    creatTour,
    updateTour,
    deleteTour,
    checkID,
} = require('../controllers/tourControllers.js');

const router = express.Router();

// param middel wear
router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(creatTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
