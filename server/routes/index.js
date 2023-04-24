const router = require("express").Router();

module.exports = (db) => {

  router.get('/characters', (req, res) => {
    const command = 'SELECT * FROM characters';
    db.query(command)
      .then(data => {

        const characters = data.rows;
        const command = 'SELECT * FROM cards';

        db.query(command)
          .then(result => {
            const startingCards = result.rows;

            characters.forEach(char => {
              char.startingDeck = startingCards.filter(card => card.character_id === char.id);
            });

            res.json(characters);
          });
      });
  });

  router.get('/reward-cards', (req, res) => {

    const command = 'SELECT * FROM reward_cards';
    db.query(command)
      .then(data => {
        res.json(data.rows);
      });
  });

  return router;
};






// app.use(cors());
// app.use(express.json());
// app.use('/api', routes(db));

// app.get('/', (req, res) => {
//   res.send('Hello from the server!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
