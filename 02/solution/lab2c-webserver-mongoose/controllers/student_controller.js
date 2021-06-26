const studentsColl = require('../models/student');

module.exports.addStudent = async function (req, res) {
    let student = await studentsColl.create({
        name: req.body.name,
        grade: req.body.grade,
    }).catch(reason =>
        res.status(400).json({
            "title": "Unable to create student record",
            "detail": reason
        })
    );
    if (student) // The student was succesfully added to the collection
        res.status(201).json({
            student
        })
    else {
        res.status(500).json({
            "title": "Unknown server error"
        })
    };
};

// Return a list of students
module.exports.listStudents = async function (req, res) {
    const students = await studentsColl.find({})
        .catch(reason =>
            res.status(400).json({
                "title": "Unable to read students from the database",
                "detail": reason
            })
        );
    res.status(200).json({
        students
    })
};

// Get a specific student
module.exports.getStudent = async function (req, res) {
    try {
        const student = await studentsColl.findById(req.params.studentid);
        if (student) {
            res.status(200).json({
                student
            })
        } else {
            throw ("Student not found");
        }
    } catch (err) {
        res.status(400).json({
            "title": "Unable to read students from the database",
            "detail": err
        })
    };
}

// Update a specific student
module.exports.updateStudent = async function (req, res) {
    try {
        let student = await studentsColl.findByIdAndUpdate(req.params.studentid, {
            name: req.body.name,
            grade: req.body.grade,
        }, {
            new: true
        })
        if (student) // The student was succesfully added to the collection
            res.status(200).json({
                student
            })
        else {
            res.status(500).json({
                "title": "Unknown server error"
            })
        };
    } catch (reason) {
        res.status(400).json({
            "title": "Unable to update student record",
            "detail": reason
        })
    }
}

// Delete a specific student
module.exports.deleteStudent = async function (req, res) {
    try {
        await studentsColl.findByIdAndDelete(req.params.studentid);
        res.status(200).send();
    } catch (err) {
        res.status(400).json({
            "title": "Unable to delete student from the database",
            "detail": err
        })
    };
}