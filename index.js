"use strict";
    
var express = require('express');
var pg = require('pg');
var app = express();

const db_settings = require('./db_settings.json');
const connectionString = "postgres://" + 
db_settings.username + ":"
+ db_settings.password + "@"
+ db_settings.database + "/"
+ db_settings.name;

const client = new pg.Client(connectionString);

var gc = require('./giftcardAPI');
var gcAPI = gc(client);

/*
 * Root
 */
app.get('/', function (req, res) {
    res.status(200).send('Welcome to decode-giftcards');
});


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
    try {
        gcAPI.getCard(req.params.id, function(error, giftcard) {
            console.log("GET /card/" + req.params.id);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.send(giftcard);
        });
    } catch (error) {
        res.status(404).send('Card does not exist');
    }
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
  console.log('decode-giftcards server listening on port 3000!');
});
