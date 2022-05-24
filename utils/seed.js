const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomThought, getRandomReaction } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop exsisting Users
  await User.deleteMany({});

  // Drop exsisting Thoughts
  await Thought.deleteMany({});

  // Create empty array to hold thoughts
  const thoughts = [];

  // Get random reactions
  const reactions = getRandomReaction(3);

  // Loop 10 times -- add thoughts to thought array
  for (let i = 0; i < 10; i++) {
    const thoughtText = getRandomThought();
    thoughts.push({ thoughtText });
  }
  // add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // add ONE user to the collection with updated thought array and await the results
  await User.collection.insertOne({
    username: "miaCarmen",
    email: "miacarmengd@gmail.com",
    thoughts: [...thoughts],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(reactions);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
