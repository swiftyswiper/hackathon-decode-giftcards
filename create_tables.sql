CREATE TABLE giftcards(
	gid int PRIMARY KEY,
	amount int NOT NULL
);

CREATE TABLE corporations(
	coid int PRIMARY KEY
);

CREATE TABLE stores(
	sid int PRIMARY KEY
);

CREATE TABLE giftcard_usage(
	gid int REFERENCES giftcards(gid),
	coid int REFERENCES corporations(coid),
	date_used date NOT NULL
);

CREATE TABLE corp_stores(
	coid int REFERENCES corporations(coid),
	sid int REFERENCES stores(sid)
);


--BE CAREFUL WITH REMOVING TABLES THAT HAVE DEPENDANT TABLES
--DROP TABLE giftcards;
--DROP TABLE corporations;
--DROP TABLE stores;
--DROP TABLE giftcard_usage;
--DROP TABLE corp_stores;