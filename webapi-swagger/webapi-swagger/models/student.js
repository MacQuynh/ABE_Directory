const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: Number
});

module.exports = mongoose.model('Student', studentSchema);