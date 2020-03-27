const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Voiture = require("./voiture");
const Client = require("./client");

const locationSchema = new Schema({
  voiture: {
    type: {
      Voiture
    },
    required: true
  },
  client: {
    type: {
      Client
    },
    required: true
  },
  promotion: Number,
  montant: {
    type: Number,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  nbJoursLocation: {
    type: Number,
    required: true
  },
  accident: [{
    description: String,
    lieu: String,
    date: Date
  }]
});

module.exports = mongoose.model("Location", locationSchema);
