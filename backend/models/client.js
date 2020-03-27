const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  NCIN: { type: Number, unique:true, required: true },
  numeroPermis: { type: Number, unique:true, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateDeNaissance: { type: Date, required: true },
  adresse: { type: String, required: true },
  });

module.exports = mongoose.model("Client", clientSchema);
