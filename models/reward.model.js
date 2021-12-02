const { Types } = require("mongoose");

module.exports = mongoose => {
    var conditionSchema = mongoose.Schema(
      {
        value: { type: Number, required: true },
        operator: { type: String, required: true },
        target: { type: String, required: true },
        groups: { type: [String], required: false },
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
          deprendsOn:{ ref: "reward", type: Types.ObjectId, required: false }
        },
        { timestamps: true }
      );

    // Duplicate the ID field.
    rewardSchema.virtual('id').get(function(){
        return this._id.toHexString();
    });

    // Ensure virtual fields are serialised.
    rewardSchema.set('toJSON', {
        virtuals: true
    });
    
    const Rewards = mongoose.model("rewards", rewardSchema);
    return Rewards;
  };