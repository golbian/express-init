const db = require("../models");
const Reward = db.reward;

// Create and Save a new Reward
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const reward = new Reward({
    name: req.body.name,
    score: req.body.score,
    img: req.body.img,
    desc: req.body.desc,
    conditions: req.body.conditions,
    deprendsOn: req.body.deprendsOn,
    applyTo: req.body.applyTo,
  });

  // Save Reward in the database
  reward
    .save(reward)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reward state."
      });
    });
};

// Retrieve all Rewards from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Reward.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rewards."
        });
      });
  };

// Find a single Reward with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Reward.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Reward with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Reward with id=" + id });
      });
  };

// Update a Reward by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Reward.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Reward with id=${id}. Maybe Reward was not found!`
          });
        } else res.send({ message: "Reward was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Reward with id=" + id
        });
      });
  };

// Delete a Reward with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Reward.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Reward with id=${id}. Maybe Reward was not found!`
          });
        } else {
          res.send({
            message: "Reward was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Reward with id=" + id
        });
      });
  };