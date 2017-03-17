CREATE TABLE giftcard(
	gid int PRIMARY KEY,
	amount int NOT NULL
);

CREATE TABLE corporation(
	coid int PRIMARY KEY
);

CREATE TABLE store(
	sid int PRIMARY KEY
);

CREATE TABLE giftcardusage(
	gid int REFERENCES giftcard(gid),
	coid int REFERENCES corporation(coid),
	date_used date NOT NULL
);

CREATE TABLE corp_stores(
	coid int REFERENCES corporation(coid),
	sid int REFERENCES store(sid)
);