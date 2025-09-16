const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.post('/:storeId', authMiddleware, roleMiddleware(['normal', 'user']), ratingController.submitRating);
router.get('/:id', authMiddleware, ratingController.getRatingsByStore);

module.exports = router;


