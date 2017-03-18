var pg = require('pg')

//initiate express.js
var express = require('express');
var app = express();

//NOTE: lines 10-16 will be required in React compoents then!!!
//connect to postgresql database
const settings = require('./db_settings.json');
const connectionString = "postgres://" + settings.username + ":" + settings.password + "@" + settings.database + "/" + settings.name;
const client = new pg.Client(connectionString);

var gc = require('./giftcardAPI');
var giftcardAPI = gc(client);



// //id: 1234567890123456
// //TEST URL: http://localhost:3000/card/1234567890123456
app.get("/card/:id", function(req, res) //get a giftcard from db. res is just an id
{
    const gId = req.params.id;

    giftcardAPI.getCard(gId, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});


//create endpoint for corporation and store?


//TESTING
// giftcardAPI.createCard(function(error, result){
// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log("gift card created: ", result);
// 	}
// })

// giftcardAPI.getAllCards(function(err, res){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(res);
// 	}
// });

giftcardAPI.handleTransaction(-121, 1234567890123456, function(err, result){
	if(err){
		console.log(err);
	}
	else{
		console.log(result);
	}
})

 // giftcardAPI.getCard(1234567890123456, function(error, result) {
 //        if (error) {
 //            console.log(error);
 //        } else {
 //            console.log(result);
 //        }
 //    });



app.listen(3000); //change 3000 based on port
