const { Types } = require("mongoose");

module.exports = mongoose => {
    var conditionSchema = mongoose.Schema(
      {
        value: { type: Number, required: true },
        operator: { type: String, required: true },
        target: { type: String, required: true },
        group: { type: [String], required: false },
        ids: { type: [String], required: false },
      },
    );

    var rewardSchema = mongoose.Schema(
        {
          name: { type: String, required: true },
          img: { type: String, required: true },
          score: { type: Number, required: true },
          desc: { type: String, required: true },
          conditions:{ type: [conditionSchema], required: true},
          applyTo: { type: [String], required: true },
          dependsOn:[{ ref: "rewards", type: Types.ObjectId, required: false }]
        },
        { timestamps: true }
      );
    
    const Rewards = mongoose.model("rewards", rewardSchema);
    return Rewards;
  };