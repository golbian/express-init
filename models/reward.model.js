const { Types } = require("mongoose");

module.exports = mongoose => {
    var Schema = mongoose.Schema(
        {
          name: { type: String, required: true },
          img: { type: String, required: true },
          score: { type: String, required: true },
          desc: { type: String, required: true },
          conditions:{ 
            type: [String], 
            required: true 
          },
          deprendsOn:{ ref: "reward", type: Types.ObjectId, required: false },
          applyTo: { type: [String], required: true }
        },
        { timestamps: true }
      );

    // Duplicate the ID field.
    Schema.virtual('id').get(function(){
        return this._id.toHexString();
    });

    // Ensure virtual fields are serialised.
    Schema.set('toJSON', {
        virtuals: true
    });
    
    const Rewards = mongoose.model("rewards", Schema);
    return Rewards;
  };