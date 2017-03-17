CREATE TABLE giftcards(
	gid bigint PRIMARY KEY,
	amount decimal NOT NULL
);

CREATE TABLE corporations(
	coid int PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE stores(
	sid int PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE giftcard_usage(
	gid bigint REFERENCES giftcards(gid),
	coid int REFERENCES corporations(coid),
	date_used date NOT NULL
);

CREATE TABLE corp_stores(
	coid int REFERENCES corporations(coid),
	sid int REFERENCES stores(sid)
);