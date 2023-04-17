DROP TABLE IF EXISTS reward_cards CASCADE;

CREATE TABLE IF NOT EXISTS reward_cards (
  id SERIAL PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  attack INTEGER,
  type VARCHAR(255) NOT NULL,
  defense INTEGER,
  heal INTEGER
);
