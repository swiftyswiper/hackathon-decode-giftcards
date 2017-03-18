var uuid = require('node-uuid');

module.exports = function giftcardAPI(client) {
    return {
        getCard: function(gId, callback) {
            client.connect();
            const query = client.query(
                `SELECT * FROM giftcards WHERE giftcard_id = ${gId}`);
            query.on('row', (row) => {
                console.log(row);

                var answer = {
                    giftcard_id: row.giftcard_id,
                    balance: row.balance
                }
                callback(null, answer);
            });
            query.on('end', () => { client.end(); });
        },
        getAllCards: function(callback) { //checks for duplicates upon card generation
            var results = [];

            client.connect();
            const query = client.query(
                `SELECT * FROM giftcards ORDER BY giftcard_id ASC;`);
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                // return res.json(results);
                callback(null,
                    results.map(function(eachCard) {
                        return {
                            giftcard_id: eachCard.giftcard_id,
                            balance: eachCard.balance
                        };
                    })
                );
            });
        },
        createCard: function(callback) {
            var newGiftCardID = uuid.v1();
            var balance = 0.00;

            console.log(`giftcard id generated: ${newGiftCardID}`);

            client.connect();

            //check for duplicate gift card ID's
            this.getAllCards(function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    var idArray = result.map(function(eachCard) {
                        return eachCard.giftcard_id;
                    });

                    if (idArray.indexOf(newGiftCardID) > -1) {
                        throw Error(`Cannot create! Gift card ID already exists in database!`);
                    } else {
                        client.query('INSERT INTO giftcards(giftcard_id, balance) values(?, ?)', [newGiftCardID, balance]);

                        this.getCard(newGiftCardID, function(error, result) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(`New gift card created with id: ${result.giftcard_id} and balance: ${result.balance}!`);
                                callback(null, result); //"returns" new gift card object
                            }
                        });
                            // After all data is returned, close connection and return results
                        query.on('end', () => { client.end(); });
                    }
                }
            });
        },
        handleTransaction: function(transaction, gcObject, callback) {
            client.connect();

            var newBalance;

            if (gcObject.amount < transaction) {
                throw Error("Not enough in balance for transaction!");
            } else {
                newBalance = gcObject.amount + transaction;
            }

            client.query(`UPDATE giftcards SET balance=${newBalance} WHERE id=${gcObject.giftcard_id}`);

            this.getCard(gcObject.giftcard_id, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Balance updated to: ${result.balance}!`);
                    callback(null, result); //"returns" updated gift card object
                }
            });
                // After all data is returned, close connection and return results
            query.on('end', () => { client.end(); });
        }
        //add more functions for getCorporation and getStore?


    }; //closing bracket for BIG return

}


/***************************************************
* HOW TO USE API
****************************************************/
/*
INSTRUCTIONS
1. Make sure lines 119-124 are in your .js/.jsx file (to connect to database AND access giftcardAPI)
2. See line 128 below for test call

*/

// const settings = require('./db_settings.json');
// const connectionString = "postgres://" + settings.username + ":" + settings.password + "@" + settings.database + "/" + settings.name;
// const client = new pg.Client(connectionString);

// var gc = require('./giftcardAPI');
// var giftcardAPI = gc(client);

// giftcardAPI.getCard(gId, function(error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         //DO STUFF with the result (i.e. display on express.js server OR render it as info on React page)
//     }
// });