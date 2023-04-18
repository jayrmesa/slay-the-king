DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters (id),
    image TEXT NOT NULL,
    attack INTEGER,
    type VARCHAR(20),
    defense INTEGER,
    heal INTEGER
);