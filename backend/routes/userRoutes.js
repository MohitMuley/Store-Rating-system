const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware(['admin']), userController.getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), userController.getUserById);
router.post('/', authMiddleware, roleMiddleware(['admin']), userController.createUser);
router.put('/update-password', authMiddleware, userController.updatePassword);

module.exports = router;
