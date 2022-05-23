const { Schema, model } = require("mongoose");

// Schema to create user model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match validation
      match: [/.+\@.+\..+/],
    },
    // array of `_id` values referencing the `Thought` model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // array of `_id` values referencing the `User` model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema
  .virtual("friendCount")
  // retrieve length of user's `friends` array field on query
  .get(function () {
    return this.friends.length;
  });

const User = model("user", UserSchema);

module.exports = User;
