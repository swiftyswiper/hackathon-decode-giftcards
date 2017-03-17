var mysql = require('pg')
var uuid = require(”node-uuid”);
var connection = mysql.createConnection({ //db connection settings
  host     : 'localhost',
  user     : '<USER>',
  password : '<PASS>',
  database : '<DBNAME>'
});
var app = express();

connection.connect(function(err)
{

})

app.get("/card",function(req,res) //get a giftcard from db. res is just an id
{
	const gId = req.body.id;
	connection.connect(conString, function (err, client, done) {
   		if(!err){
			console.log("Database is connected ... nn");
		}    
		else{
			console.log("Error connecting database ... nn"); 
		}   
   		client.query('SELECT * FROM giftcards WHERE gId = ?', [gId], function (err, result) 
		{
      			done()
     			if (err){ 
				return next(err);
			}

		res.json(result)
	connection.end()
		})
	})
})

app.post("/card/setFunds",function(req,res) //update funds. res is amount and id
{
	const newFunds = req.body.amount
	const gId = req.body.id
	connection.connect(conString, function (err, client, done) {
   		if(!err){
			console.log("Database is connected ... nn");
		}    
		else{
			console.log("Error connecting database ... nn"); 
		}   
   		client.query('UPDATE giftcards SET amount = ? WHERE gid = ?;', [newFunds, gId], function (err, result) 
		{
      			done() //connection can be closed
     			if (err){ 
				return next(err);
			}
		
		res.send(200);
		})
	})
})


function checkBalance (gcObject){

	return gcObject.amount;
}

function creditDebitGC (gcObject, transaction){
	if (gcObject.amount < transaction){
		throw Error ("Not enough in balance for transaction!");
	}
	else {
		gcObject.amount = gcObject.amount + transaction;
	}
	return gcObject.amount;
}

/*
 * Provisioning a new card
 */
app.get('/card/newCard', (req, res) => {
	var newGiftCardID = uuid.v1();

  client.connect(function () {

  	if(client.query('SELECT EXISTS(SELECT 1 FROM giftcards WHERE gID=?', [newGiftCardID]))
  	{
  		newGiftCardID = uuid.v1();
  	}
    // SQL Query > Insert Data
    var query = client.query('INSERT INTO giftcards(gid, amount) values(?, ?)', [newGiftCardID, 0]);

    // After all data is returned, close connection and return results
    query.on('end', () => {
      client.end();
      return newGiftCardID;
    });
  });
