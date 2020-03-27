const express = require("express");
const Client = require("../models/client");

const router = express.Router();
router.get("", (req, res, next) => {
  try {
    Client.find().then(doc => {
      res.status(200).json({
        doc
      })
    })
  } catch (error) {
    res.status(401).json("Liste des clients indisponible")
  }

});

router.post("", (req, res, next) => {
  try {
    client = new Client(req.body);
    client.save().then(com => {
      res.status(201).json({
        message: "client added successfully",
      });
    });
  } catch (error) {
    res.status(401).json("impossible d'ajouter le client")
  }
});

router.get("/:id", (req, res, next) => {
  try {
    Client.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2));
      }
    });
  } catch (error) {
    res.status(401).json("Client non trouvé")
  }
});

router.put("/:id", (req, res, next) => {
  try {
    Client.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function (err, doc) {
      if (err) return next(err);
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    res.status(401).json("impossible de faire la mise à jour")
  }
});

router.delete('/:id', (req, res) => {
  try {
    Client.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in user Delete :' + JSON.stringify(err, undefined, 2));
      }
    });
  } catch (error) {
    res.status(401).json("Erreur lors de la suppression du client")
  }

});

module.exports = router;
