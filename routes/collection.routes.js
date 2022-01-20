module.exports = app => {
    const collections = require("../controllers/collection.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Collection
    router.post("/", collections.create);
  
    // Retrieve all Collections
    router.get("/", collections.findAll);
  
    // Retrieve a single Collection with id
    router.get("/:id", collections.findOne);
  
    //Push a reward to a Collection with id
    router.put("/add-reward", collections.addRewardToCollection);

    // Update a Collection with id
    // router.put("/:id", collections.update);
  
    // Delete a Collection with id
    router.delete("/:id", collections.delete);
  
    app.use('/api/collections', router);
  };