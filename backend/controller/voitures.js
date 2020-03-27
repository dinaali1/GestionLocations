const express = require("express");
const Voiture = require("../models/voiture");

const router = express.Router();

router.get("", (req, res, next) => {
  try {
    Voiture.find().then(doc => {
      res.status(200).json({
        doc
      })
    })
  } catch (error) {
    res.status(404).json("Erreur lors de l'affichage des voitures")
  }
});

router.post("", (req, res, next) => {
  try {
    voit = new Voiture(req.body);
    voit.save().then(com => {
      res.status(201).json({
        message: "cars added successfully",
      });
    });
  } catch (error) {
    res.status(404).json("Impossible de creer la voiture")
  }
});

router.get("/:id", (req, res, next) => {
  try {
    Voiture.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2));
      }
    });
  } catch (error) {
    res.status(404).json("Voiture non trouvée")
  }
});

router.put("/:id", (req, res, next) => {
  try {
    Voiture.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function (err, doc) {
      if (err) return next(err);
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    res.status(404).json("Impossible de MAJ la voiture")
  }
});

router.delete('/:id', (req, res) => {
  try {
    Voiture.findByIdAndRemove(req.params.id, (err, doc) => {
      res.send(doc);
    });
  } catch (err) {
    res.status(404).json("Impossible de supprimer la voiture")
  }
});

module.exports = router;
