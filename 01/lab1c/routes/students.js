var express = require('express');
var router = express.Router();
var studentController = require('../controllers/student_controller')

/* GET add student form */
router.get('/add', studentController.addStudentForm);

/* GET add student form */
router.post('/add', studentController.addStudent);

/* GET users listing. */
router.get('/list', studentController.listStudents);

module.exports = router;
