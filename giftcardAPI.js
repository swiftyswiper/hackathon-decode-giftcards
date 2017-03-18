var uuid = require('uuid');

module.exports = function giftcardAPI(client) {
    return {
        getCard: function(gId, callback) {
            client.connect();

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
            query.on('end', () => { client.end(); });
        },
        getAllCards: function(callback) { //checks for duplicates upon card generation
            var results = [];

            client.connect();
            const query = client.query(
                `SELECT * FROM giftcards ORDER BY giftcard_id ASC;`);
            query.on('row', (row) => {
                // console.log(row);
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
            var balance = 0.00;

            client.connect();

            //check for duplicate gift card ID's
            if(client.query('SELECT EXISTS(SELECT 1 FROM giftcards WHERE giftcard_id=?', [newGiftCardID]))
  			{
                //if giftcard id exists, generate new uuid
  				newGiftCardID = uuid.v1();
  			}
 
            const query = client.query('INSERT INTO giftcards(giftcard_id, balance) values(?, ?)', [newGiftCardID, balance]);

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
        },
            
        handleTransaction: function(transaction, gc_id, callback) {
            var giftcard;
            this.getCard(gc_id, (error, result) => {
                giftcard = result;

                var newBalance;

                if (giftcard.balance+transaction < 0) {
                    throw Error("Not enough in balance for transaction!");
                } else {
                    console.log("You can do this update!! Yahhhhss")
                    newBalance = +giftcard.balance + transaction;
                }

                console.log(newBalance);
                //UPDATE giftcards SET balance=0 WHERE giftcard_id=1234567890123456;
                const query = client.query(`UPDATE giftcards SET balance=${newBalance} WHERE giftcard_id=${giftcard.giftcard_id};`);
                console.log("I was updated!!!!!!!");

                //client.end();
                // console.log(query);;

                callback(null, {giftcard_id: giftcard.giftcard_id, 
                    balance: newBalance});

            })


            



            // this.getCard(gcObject.giftcard_id, function(error, result, done) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log(`Balance updated to: ${result.balance}!`);
            //         callback(null, result); //"returns" updated gift card object
            //     }
            // });
                // After all data is returned, close connection and return results

            // query.on('error', (error) => {console.log(error)});
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
