const { Schema, model } = require("mongoose");
const moment = require('moment');

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
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
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

// subdocument of `reaction` field in Thought model
const ReactionSchema = new Schema(
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
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
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

ThoughtSchema.virtual("reactionCount")
  // retrieve the length of the thought's `reactions` array field on query
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
