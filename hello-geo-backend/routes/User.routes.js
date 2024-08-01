const express = require('express');
const userController = require('../controllers/userController');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id', userController.partialUpdateUser);
router.delete('/users/:id', userController.deleteUser);

router.use(errorHandler);

module.exports = router;
