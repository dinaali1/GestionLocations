const express = require("express");
const Voiture = require("../models/voiture");
const Location = require("../models/location");
const router = express.Router();

router.get("/modele", (req, res, next) => {
  try {
    Location.aggregate([{
          $group: {
            _id: "$voiture.modele",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(doc => {
        res.status(200).json({
          doc
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/maxNombreLocation", (req, res, next) => {
  try {

    Location.aggregate([{
          $group: {
            _id: "$voiture.numeroChassis",
            count: {

              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(doc => {
        Voiture.findOne({
          numeroChassis: doc[0]._id
        }).then(voiture => {
          res.status(200).json({
            nbLoc: doc[0].count,
            voiture
          })
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/maxNombreJoursLocation", (req, res, next) => {
  try {
    Location.aggregate([{
          $group: {
            _id: "$voiture.numeroChassis",
            nbJoursLocation: {
              $sum: "$nbJoursLocation"
            },
          },
        },
        {
          $sort: {
            nbJoursLocation: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(doc => {
        Voiture.findOne({
          numeroChassis: doc[0]._id
        }).then(voiture => {
          res.status(200).json({
            nbJours: doc[0].nbJoursLocation,
            voiture
          })
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/voitureNonLouee", (req, res, next) => {
  try {
    var array = [];
    Location.find({}, {
      voiture: 1
    }).then(voiture => {
      voiture.map(x => {
        array.push(x.voiture.numeroChassis)
      })
      Voiture.find({
        numeroChassis: {
          $nin: array
        }
      }).then(voiture => {
        res.status(200).json({
          voiture
        })
      })
    })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
})

router.get("/laPlusRentable", (req, res, next) => {
  try {
    Location.aggregate([{
          $group: {
            _id: "$voiture.numeroChassis",
            montant: {
              $sum: "$montant"
            },
          },
        },
        {
          $sort: {
            montant: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(doc => {
        Voiture.findOne({
          numeroChassis: doc[0]._id
        }).then(voiture => {
          res.status(200).json({
            montant: doc[0].montant,
            voiture
          })
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/laVoitureLaPlusAccidentee", (req, res, next) => {
  try {
    Location.aggregate([{
          $match: {
            "accident.description": {
              $ne: ''
            }
          }
        },
        {
          $group: {
            _id: "$voiture",
            accident: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            accident: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(voiture => {
        res.status(200).json({
          voiture
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});


router.get("/laPlusPuissante", (req, res, next) => {
  try {
    Voiture.findOne().sort({
        puissance: -1
      }).limit(1)
      .then(voiture => {
        res.status(200).json({
          voiture
        })
      })
  } catch (error) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/clientFidele", (req, res, next) => {
  try {
    Location.aggregate([{
          $group: {
            _id: "$client",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(client => {
        res.status(200).json({
          nbloc: client[0].count,
          client
        })
      })
  } catch (err) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/clientQuiAFaitLePlusAccident", (req, res, next) => {
  try {
    Location.aggregate([{
          $match: {
            "accident.description": {
              $ne: ''
            }
          }
        }, {
          $group: {
            _id: "$client",
            accident: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            accident: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(client => {
        res.status(200).json({
          client
        })
      })
  } catch (err) {
    res.status(404).json(JSON.stringify(error))
  }
});


router.get("/clientRentable", (req, res, next) => {
  try {
    Location.aggregate([{
          $group: {
            _id: "$client",
            montant: {
              $sum: "$montant"
            },
          },
        },
        {
          $sort: {
            montant: -1
          }
        },
        {
          $limit: 1
        }
      ])
      .then(client => {
        res.status(200).json({
          client
        })
      })
  } catch (err) {
    res.status(404).json(JSON.stringify(error))
  }
});

router.get("/laplusLouee", (req, res, next) => {
  try{
    Location.findOne().sort({
      nbJoursLocation: -1
    }).limit(1)
    .then(doc => {
      res.status(200).json({
        doc
      })
    })
  } catch (err) {
    res.status(404).json(JSON.stringify(error))
  }
});

module.exports = router;
