const { Schema, model } = require("mongoose");

// Schema to create user model
const userSchema = new Schema(
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
      match: /.+\@.+\..+/,
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
    },
    id: false,
  }
);


userSchema
.virtual('friendCount')
// retrieve length of user's `friends` array field on query
.get(function () {
    return `${this.friends.length}`
});

const User = model("user", userSchema);

module.exports = User;
