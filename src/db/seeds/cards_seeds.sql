INSERT INTO cards (id, character_id, image_url, attack, type, defense)
VALUES
  (1, 1, '/public/images/cards/yellowknight/attack1.png', 5, 'attack', NULL),
  (2, 1, '/public/images/cards/yellowknight/special1.png', 7, 'special', NULL),
  (3, 1, '/public/images/cards/yellowknight/shield1.png', 0, 'defend', 5),
  -- more cards for other characters
  (11, 2, '/public/images/cards/greenarcher/attack1.png', 6, 'attack', NULL),
  (12, 2, '/public/images/cards/greenarcher/special1.png', 12, 'special', NULL),
  (13, 2, '/public/images/cards/greenarcher/shield1.png', 0, 'defend', 4),
  (21, 3, '/public/images/cards/redmage/attack1.png', 7, 'attack', NULL),
  (22, 3, '/public/images/cards/redmage/special1.png', 14, 'special', NULL),
  (23, 3, '/public/images/cards/redmage/shield1.png', 0, 'defend', 3);
