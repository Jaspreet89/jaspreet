/*var DBM = require('./DB-Manager');
var DBS = require('./DB-Seed');*/
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
	/*app.get('/GetData', function (req, res) {
		DBM.GetFoodData().toArray(function (err, items) {
                res.send(items);
            });       
    });
	app.get('/updateDB', function (req, res) {
		DBM.DropFoodData();
		DBS.Data().forEach(function(data_entry) { 
				DBM.InsertFoodData(data_entry);		
			});
       
    });*/
    
};
