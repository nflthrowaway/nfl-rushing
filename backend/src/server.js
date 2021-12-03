import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import RushingController from './controllers/RushingController';
import DataLoader from './data/DataLoader';

dotenv.config();

// --- Load data into mongodb ---
// Connect to mongodb
const url = `mongodb://mongodb:27017/rushing`
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(err => {
    console.log("Error connecting to mongodb: ", err);
    process.exit();
  });

// Load json data to mongodb
const dataLoader = new DataLoader();
dataLoader.loadData();
const rushingController = new RushingController();

// Clear existing data and add new data
rushingController.getCount()
  .then((count) => {
    if (!count) {
      // Add data from json
      rushingController.add(dataLoader.data)
        .then(() => console.log("Loaded all data into mongodb"))
        .catch(err => console.log("Error loading data into mongodb: ", err));
    }
  })
  .catch(err => console.log("Error getting document count: ", err));



// --- Startup express server ---
const app = express();
const PORT = 8080;

var corsOptions = {
  origin: "http://localhost:8888"
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Register routes ---
app.get('/rushing', async (request, response) => {
  const data = await rushingController.getAll(
    parseInt(request.query['limit']),
    parseInt(request.query['skip']),
    request.query['sort'],
    request.query['sortDirection'],
    request.query['filter']);
  response.send(data);
});

app.listen(PORT, () => {
  console.log(`Rushing data server running on port ${PORT}.`);
});