require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

router.get('/characters', async (req, res) => {
  const client = new Client({ connectionString });
  await client.connect();

  try {
    const result = await client.query('SELECT * FROM characters');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'An error occurred while fetching characters' });
  } finally {
    await client.end();
  }
});

module.exports = router;
