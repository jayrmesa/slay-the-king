// reset database
require("dotenv").config();
const { Client } = require('pg');
const SCHEMA_PATH = './src/db/schema';
const SEEDS_PATH = './src/db/seeds';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
const fs = require("fs").promises;

const connObj = {
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT, 
};

const runMigrations = async db => {
	const migrations = await fs.readdir(SCHEMA_PATH);
	for (let migration of migrations) {
		const sql = await fs.readFile(`${SCHEMA_PATH}/${migration}`, 'utf8');
		console.log(`\t Running ${migration}`);
		await db.query(sql);
	}
};

const runSeeds = async db => {
	const seeds = await fs.readdir(SEEDS_PATH);
	for (let seed of seeds) {
		const sql = await fs.readFile(`${SEEDS_PATH}/${seed}`, 'utf8');
		console.log(`\t Running ${seed}`);
		await db.query(sql);
	}
};

const resetDB = async () => {
  const client = new Client(connObj);

  try {
    console.log("Running DB Reset...");
    console.log("DB connecting... ");
    await client.connect();
    console.log("Connected!\n");

    console.log("-- Running Schema --\n");
    await runMigrations(client);
    console.log('\n');
    console.log("-- Running Seeds --\n");
    await runSeeds(client);
    console.log('\n');
    console.log("-- DONE --");
  } catch (e) {
    console.log("ERROR OCCURED:\n", e);
  } finally {
    client.end();
  }
};

resetDB();
