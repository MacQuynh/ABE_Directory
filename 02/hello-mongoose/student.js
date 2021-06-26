
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Define a schema
var StudenterSchema = mongoose.Schema({
name: String,
grade: String,
date: String,
});

const student = mongoose.model("Student", StudenterSchema);
module.exports = student;