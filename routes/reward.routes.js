module.exports = app => {
    const rewards = require("../controllers/reward.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Grid
    router.post("/", rewards.create);
  
    // Retrieve all Grids
    router.get("/", rewards.findAll);
  
    // Retrieve a single Grid with id
    router.get("/:id", rewards.findOne);
  
    // Update a Grid with id
    router.put("/:id", rewards.update);
  
    // Delete a Grid with id
    router.delete("/:id", rewards.delete);
  
    app.use('/api/rewards', router);
  };