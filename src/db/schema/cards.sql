CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters (id),
    image_url TEXT,
    attack INTEGER,
    type VARCHAR(20),
    defense INTEGER,
    heal INTEGER
);