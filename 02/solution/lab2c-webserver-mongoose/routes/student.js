const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

router.route('')
    .get(studentController.listStudents)
    .post(studentController.addStudent);

router.route('/:studentid')
    .get(studentController.getStudent)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent)

module.exports = router;
