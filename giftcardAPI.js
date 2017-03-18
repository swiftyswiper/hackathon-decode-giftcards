var uuid = require('uuid');

module.exports = function giftcardAPI(client) {
    client.connect();
    return {
        getCard: function(gId, callback) {

            const query = client.query(
                `SELECT * FROM giftcards WHERE giftcard_id = '${gId}'`);

            query.on('row', (row) => {
                var answer = {
                    giftcard_id: row.giftcard_id,
                    balance: +row.balance
                }
                callback(null, answer);
            });
            query.on('error', (error) => { console.log(error); client.end(); });
        },
        getAllCards: function(callback) { //checks for duplicates upon card generation
            var results = [];

            const query = client.query(
                `SELECT * FROM giftcards ORDER BY giftcard_id ASC;`);
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                // done();
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
            var balance = '0.00';

            // //check for duplicate gift card ID's
            //SQL test: SELECT EXISTS(SELECT 1 FROM giftcards WHERE giftcard_id=1234567890123456
            if (client.query(`SELECT EXISTS(SELECT 1 FROM giftcards WHERE giftcard_id='${newGiftCardID}');`)) {
                //if giftcard id exists, generate new uuid
                newGiftCardID = uuid.v1();
            }

            //SQL TEST: INSERT INTO giftcards(giftcard_id, balance) values('af85d680-0c15-11e7-a68d-277af3e783e9', 0.00)
            const query = client.query(`INSERT INTO giftcards(giftcard_id, balance) values('${newGiftCardID}', ${balance})`);

            callback(null, newGiftCardID);

            query.on('error', (error) => { console.log(error); client.end(); });
        },
            
        handleTransaction: function(transaction, gc_id, callback) {
            var giftcard;
            this.getCard(gc_id, (error, result) => {
                giftcard = result;

                var newBalance;

                if (+transaction === NaN) {
                    callback("transaction amount must be a number");
                };

                if (giftcard.balance + +transaction < 0) {
                    callback("insufficient funds");
                    return;
                } else {
                    newBalance = +giftcard.balance + +transaction;
                }

                const query = client.query(`UPDATE giftcards SET balance=${newBalance} WHERE giftcard_id='${giftcard.giftcard_id}';`);

                callback(null, {giftcard_id: giftcard.giftcard_id, 
                    balance: newBalance});

            })
        },
        //add more functions for getCorporation and getStore?
        getAllTheThings: function(callback){

                        /*var queryString = `SELECT CORPORATIONS.NAME AS corporation_name, STORES.NAME AS store_name
FROM CORPORATIONS NATURAL JOIN CORP_STORES JOIN STORES ON CORP_STORES.STORE_ID = STORES.STORE_ID
WHERE CORPORATIONS.CORP_ID IN 
    (SELECT CORP_ID 
    FROM GIFTCARD_USAGE 
    WHERE GIFTCARD_ID = 1234567890123456)
;`*/
        }


    }; //closing bracket for BIG return

}


/***************************************************
* HOW TO USE API
****************************************************/
/*
INSTRUCTIONS
1. Make sure lines 121-126 are in your .js/.jsx file (to connect to database AND access giftcardAPI)
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
