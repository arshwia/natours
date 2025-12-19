const express = require('express');

const {
    getAllUsers,
    creatUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userControllers.js');

const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(creatUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
