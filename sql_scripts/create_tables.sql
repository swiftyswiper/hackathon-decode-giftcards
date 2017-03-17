CREATE TABLE giftcards(
	giftcard_id bigint PRIMARY KEY,
	amount decimal NOT NULL
);

CREATE TABLE corporations(
	corp_id int PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE stores(
	store_id int PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE giftcard_usage(
	giftcard_id bigint REFERENCES giftcards(giftcard_id),
	corp_id int REFERENCES corporations(corp_id),
	date_used date NOT NULL
);

CREATE TABLE corp_stores(
	corp_id int REFERENCES corporations(corp_id),
	store_id int REFERENCES stores(store_id)
);