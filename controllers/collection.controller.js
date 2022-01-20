const db = require("../models");
const Collection = db.collection;

// Create and Save a new Collection
exports.create = async (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const collection = new Collection({
    name: req.body.name,
    rewards: []
  });

  // Save Collection in the database
  await collection
    .save(collection)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err.message);
    })
};

// Retrieve all Collections from the database.
exports.findAll = async (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    const collections = await Collection.find(condition).populate("rewards").exec();
      try {
        res
        .status(200)
        .send(collections)
      }
      catch (err) {
        res
          .status(500)
          .send(err)
      }
  };

// Find a single Collection with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
  
    const collection = await Collection.findById(id).populate("rewards").exec();
    try {
      res
      .status(200)
      .send(collection)
    }
    catch (err) {
      res
        .status(500)
        .send(err)
    }
  };

// Update a Collection by the id in the request
exports.addRewardToCollection = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "rewards to push can not be empty!"
    });
  }

  const id = req.query.id;
  const rewardId = req.query.rewardId;
  console.log(id, rewardId)

  Collection.findByIdAndUpdate(id, { $push: {rewards: rewardId }})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Collection with id=${id}. Maybe Collection was not found!`
        });
      } else res.send({ message: "Collection was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Collection with id=" + id
      });
    });
};

// Update a Collection by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//       return res.status(400).send({
//         message: "Data to update can not be empty!"
//       });
//     }
  
//     const id = req.params.id;
  
//     Collection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot update Collection with id=${id}. Maybe Collection was not found!`
//           });
//         } else res.send({ message: "Collection was updated successfully." });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Collection with id=" + id
//         });
//       });
//   };

// Delete a Collection with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Collection.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Collection with id=${id}. Maybe Collection was not found!`
          });
        } else {
          res.send({
            message: "Collection was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Collection with id=" + id
        });
      });
  };