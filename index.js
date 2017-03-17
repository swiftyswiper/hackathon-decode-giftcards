"use strict";
    
var express = require('express');
var app = express();


/*
 * Provisioning a new card
 */
app.post('/card', function (req, res) {
    res.status(500).send('Enpoint not implemented');
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
    res.status(500).send('Enpoint not implemented');
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
