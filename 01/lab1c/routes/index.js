var express = require('express');
var router = express.Router();
const homeController = require('../controllers/home_controller')

/* GET home page. */
router.get('/', homeController.homePage);

module.exports = router;
