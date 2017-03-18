const pg = require('pg');
const settings = require('./db_settings.json');
const connectionString = "postgres://" + settings.username + ":" + settings.password + "@" + settings.database + "/" + settings.name;


const client = new pg.Client(connectionString);

client.connect();
const query = client.query(
    'SELECT * FROM giftcards;');
query.on('row', (row) => {
   console.log(row); 
});
query.on('end', () => { client.end(); });
