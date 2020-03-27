const express = require("express");
const Location = require("../models/location");
const Client = require("../models/client");
const Voiture = require("../models/voiture");

const router = express.Router();
router.get("", (req, res, next) => {
  try {
    Location.find().then(doc => {
      res.status(200).json({
        doc
      })
    })
  } catch (err) {
    res.status(404).json("Impossible de retourner les locations")
  }
});

router.post("", (req, res, next) => {
  try {
    Client.find({
      NCIN: req.body.NCIN
    }, function (err, client) {
      if (client.length === 0) {
        res.status(404).json({
          message: "ClientNotFound",
        });
      } else {
        Voiture.find({
          numeroChassis: req.body.numeroChassis
        }, function (err, voiture) {
          if (voiture.length === 0) {
            res.status(404).json({
              message: "CarNotFound",
            });
            return;
          } else {
            location = new Location({
              voiture: voiture[0],
              client: client[0],
              promotion: req.body.promotion,
              montant: req.body.montant,
              dateDebut: req.body.dateDeDebut,
              nbJoursLocation: req.body.nbJoursLocation,
              accident: req.body.accident
            });
            location.save().then(com => {
              res.status(201).json({
                message: "Location added successfully",
              });
            });
          }
        })
      }
    });
  } catch (err) {
    res.status(404).json("Impssible de creer la location")
  }
});

router.get("/:id", (req, res, next) => {
  try {
    Location.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2));
      }
    });
  } catch (err) {
    res.status(404).json(" location non trouvée")
  }
});

router.put("/:id", (req, res, next) => {
 try {
  Client.find({
    NCIN: req.body.NCIN
  }, function (err, client) {
    if (client.length === 0) {
      res.status(404).json({
        message: "ClientNotFound",
      });
    } else {
      Voiture.find({
        numeroChassis: req.body.numeroChassis
      }, function (err, voiture) {
        if (voiture.length === 0) {
          res.status(404).json({
            message: "CarNotFound",
          });
        } else {
          console.log(client[0]);
          console.log(voiture[0]);
          Location.findOneAndUpdate({
            _id: req.params.id
          }, {
            voiture: voiture[0],
            client: client[0],
            promotion: req.body.promotion,
            montant: req.body.montant,
            dateDebut: req.body.dateDeDebut,
            nbJoursLocation: req.body.nbJoursLocation,
            accident: req.body.accident
          }, function (err, doc) {
            if (err) return next(err);
            res.status(200).json({
              message: "updated"
            });
          });
        }
      })
    }
  });
 } catch (err) {
   res.status(404).json("Impossible de MAJ la location")
 }
});

router.delete('/:id', (req, res) => {
  try {
    Location.findByIdAndRemove(req.params.id, (err, doc) => {
        res.send(doc);
    });
  } catch (err) {
    res.status(404).json("Impossible de supprimer la location")
  }

});

module.exports = router;
