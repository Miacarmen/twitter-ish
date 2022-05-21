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
      // TO DO: use a getter method to format the timestamp on query
      
    },
    // refers to the user that created this thought
    username: {
      type: String,
      required: true,
    },
    // replies
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// subdocument of `reaction` field in Thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // TO DO: use getter method to format the timestamp on query
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual("reactionCount")
  // retrieve the length of the thought's `reactions` array field on query
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
