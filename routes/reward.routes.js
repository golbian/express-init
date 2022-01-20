module.exports = app => {
    const rewards = require("../controllers/reward.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Reward
    router.post("/", rewards.create);
  
    // Retrieve all Rewards
    router.get("/", rewards.findAll);
  
    // Retrieve a single Reward with id
    router.get("/:id", rewards.findOne);
  
    // Update a Reward with id
    router.put("/:id", rewards.update);
  
    // Delete a Reward with id
    router.delete("/:id", rewards.delete);
  
    app.use('/api/rewards', router);
  };