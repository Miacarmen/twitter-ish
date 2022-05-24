const { Schema, model } = require("mongoose");
// const { getDateTime } = require('../utils/helpers');

// subdocument of `reaction` field in Thought model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      // TO-DO: add get to format date
      // get: getDateTime,
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

const ThoughtSchema = new Schema(
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
      // TO-DO: add get to format date
    },
    // refers to the user that created this thought
    username: {
      type: String,
      required: true,
    },
    // replies
    reactions: [ReactionSchema],
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

ThoughtSchema.virtual("reactionCount")
  // retrieve the length of the thought's `reactions` array field on query
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
