"use strict";
    
var express = require('express');
var bodyparser = require('body-parser');
var pg = require('pg');
var app = express();
app.use(bodyparser.json());

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
    gcAPI.createCard(function(error, card_id) {
        console.log("POST /card");
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Location', `${card_id}`);

        res.send({"card_id": card_id, "balance": 0.0});
    });
});

/*
 * Get info about a card
 */
app.get('/card/:id', function (req, res) {
    gcAPI.getCard(req.params.id, function(error, giftcard) {
        console.log("GET /card/" + req.params.id);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (giftcard === undefined) {
            res.status(404).send('Card does not exist');
        } else {
            res.send(giftcard);
        }
    });
});


/*
 * Debit a card
 */
app.post('/card/:id/debit', function (req, res) {
    gcAPI.handleTransaction(
            -req.body.amount,
            req.params.id,
            function(error, giftcard) {
        console.log("GET /card/" + req.params.id + "/debit");
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (error !== null) {
            res.status(400).send({"error": "insufficient funds"});
        } else {
            res.send(giftcard);
        }
    });
});

/*
 * Credit a card
 */
app.post('/card/:id/credit', function (req, res) {
    gcAPI.handleTransaction(
            req.body.amount,
            req.params.id,
            function(error, giftcard) {
        console.log("GET /card/" + req.params.id + "/credit");
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (error !== null) {
            res.status(500).send({"error": "insufficient funds"});
        } else {
            res.send(giftcard);
        }
    });
});


app.listen(3000, function () {
  console.log('decode-giftcards server listening on port 3000!');
});
