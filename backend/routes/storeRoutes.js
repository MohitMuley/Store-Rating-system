const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), storeController.createStore);
router.get('/', authMiddleware, storeController.getAllStores);
router.get('/:id', authMiddleware, storeController.getStoreById);

module.exports = router;
