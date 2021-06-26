const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve the list of students
 *     description: Retrieve a list of students. Can be used to something...
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The students's name.
 *                         example: John Doe
 *                       grade:
 *                         type: integer
 *                         description: The students grade.
 *                         example: 7
 */
router.route('').get(studentController.listStudents)
    .post(studentController.addStudent);

router.route('/:studentid')
    .get(studentController.getStudent)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent)

module.exports = router;
