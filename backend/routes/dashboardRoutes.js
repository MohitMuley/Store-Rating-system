const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin dashboard → show stats about all users/stores/ratings
router.get('/admin',authMiddleware,roleMiddleware(['admin']),dashboardController.adminDashboard);

router.get('/store/:id',authMiddleware,roleMiddleware(['storeOwner']),dashboardController.storeOwnerDashboard);
// Store owner dashboard → show stats about their own store

module.exports = router;
