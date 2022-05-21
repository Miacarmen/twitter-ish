const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // must be between 1-280 chars
      minlength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      timestamps: true,
      // TO DO: Use a getter method to format the timestamp on query
    },
    // the user that created this thought
    username: {
        type: String,
        required: true,
    },
    // replies
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


// TO DO: Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.


const Thought = model("thought", thoughtSchema);

module.exports = Thought;
