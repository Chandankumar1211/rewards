const express = require('express');
const router = express.Router();
const userController = require('../Controller/User');


router.route('/getUsers').get(userController.getUsers);
router.route('/getUserDetail').post(userController.getUserDetail);

module.exports = router;