DROP TABLE IF EXISTS characters CASCADE;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    health INTEGER,
    max_health INTEGER,
    image_url TEXT,
    idle_gif_url TEXT,
    attack_gif_url TEXT,
    special_attack_gif_url TEXT,
    hit_gif_url TEXT
);

