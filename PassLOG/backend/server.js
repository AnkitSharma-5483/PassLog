const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require("cors")

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PassLOG';
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

// GET
app.get('/', async (req, res)=>{
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const passwords = await collection.find({}).toArray();
  res.json(passwords)
})

// POST
app.post('/', async (req, res)=>{
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({success: true, result})
})

// DELETE
app.delete('/', async (req, res)=>{
  const { id } = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id: id });
  res.send({success: true, result})
})

// Start Server AFTER Mongo Connect
async function startServer() {
  await client.connect();
  console.log("MongoDB Connected");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
