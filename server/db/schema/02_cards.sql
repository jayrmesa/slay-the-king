DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters (id),
    image_url VARCHAR(255) NOT NULL,
    attack INTEGER,
    type VARCHAR(20),
    defense INTEGER,
    heal INTEGER
);