// getting-started.js
const mongoose = require('mongoose');
const student = require('./student');
const dbURI = 'mongodb://localhost/StudentsMongoose';
var students = require('./student');
async function main() {
    try{
        await mongoose.connect(dbURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        student.create({name:"Randi", grade: "12",date:"2021.12.12"}, function (err, students){
            if(err) return handleError(err);
        })
        student.updateOne({name:"Mads", grade: "12", date: "2021.12.12"}, function (err, students){
            if(err) return handleError(err);
        })
        student.deleteOne({name:"Mads", grade: "12", date: "2021.12.12"}, function (err, students){
            if(err) return handleError(err);
        })
    } catch (error) {
        console.log(error);
    }
   
}
main();
    
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
    });
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
    });
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
    });

// For nodemon restarts
    process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
    });
    });

// For app termination
    process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
    process.exit(0);
    });
    });
// For Heroku app termination
    process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
    });
    });

