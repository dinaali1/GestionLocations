const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors= require('cors');
const path = require("path");

const app = express();


const voituresRoute = require('./controller/voitures');
const clientsRoute = require('./controller/clients');
const locationsRoute = require('./controller/locations');
const statistiquesRoute = require('./controller/statistiques');


mongoose.connect("mongodb://localhost:27017/BDA").then(
  () => {
    console.log('connected to database');
  })
  .catch(
    () => {
      console.log('connected failed');
    });

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/voiture", voituresRoute);
app.use("/client", clientsRoute);
app.use("/location", locationsRoute);
app.use("/statistiques", statistiquesRoute);


module.exports = app;
