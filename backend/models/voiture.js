const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voitureSchema = new Schema({
  numeroChassis: {
    type: String,
    required: true
  },
  numeroImmat: {
    type: String,
    required: true
  },
  marque: {
    type: String,
    required: true
  },
  modele: {
    type: String,
    required: true
  },
  dateCirculation: {
    type: Date,
    required: true
  },
  puissance: {
    type: String,
    required: true
  },
  nombreCylindre: {
    type: String,
    required: true
  },
  prixLocation: {
    type: Number,
    required: true
  },
  assurance: {
    type: {
      assureur: {
        type: String,
        required: true
      },
      typeAss: {
        type: String,
        required: true
      },
      cotisation: {
        type: String,
        required: true
      }
    },
    required: true
  }
});
module.exports = mongoose.model("Voiture", voitureSchema);
