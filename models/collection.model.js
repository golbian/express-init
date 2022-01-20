const { Types } = require("mongoose");

module.exports = mongoose => {

    var collectionSchema = mongoose.Schema(
        {
          name: { type: String, required: true },
          rewards:[{ ref: "rewards", type: Types.ObjectId}]
        },
        { timestamps: true }
      );
    
    const Collections = mongoose.model("collections", collectionSchema);
    return Collections;
  };