DROP TABLE IF EXISTS characters CASCADE;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    health INTEGER,
    max_health INTEGER,
    image_url VARCHAR(255) NOT NULL,
    idle_gif TEXT NOT NULL,
    attack_gif TEXT NOT NULL,
    special_attack_gif TEXT NOT NULL,
    hit_gif TEXT NOT NULL
);

