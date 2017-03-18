"use strict";
    
var express = require('express');
var app = express();

var cardObject = {
		"ID":12,
		"amount": 500,
		"orgID": 1001
	};



/*
 * Provisioning a new card
 */
app.get('/card', function (req, res) {
    //res.status(500).send('Enpoint not implemented');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(JSON.stringify(cardObject));
});

/*
 * Get info about a card
 */
app.get('/card/:id', function (req, res) {
    console.log(req.params.id);
    res.status(500).send('Enpoint not implemented');
});


/*
 * Debit a card
 */
app.post('/card/:id/debit', function (req, res) {
    console.log(req.params.id);
    res.status(500).send('Enpoint not implemented');
});

/*
 * Credit a card
 */
app.post('/card/:id/credit', function (req, res) {
    console.log(req.params.id);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(500).send('Enpoint not implemented');

});


app.listen(3200, function () {
  console.log('decode-giftcards server listening on port 3200!');
});
