/* GET home page */
module.exports.homePage = function (req, res) {
    res.render('index', {
        title: 'Lab 2a - ejs'
    });
}