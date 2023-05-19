const { MongoClient } = require("mongodb");

const state = {
  db: null,
};

module.exports.connect = function () {
  const url =
    process.env.MONGO_URL ||
    "mongodb+srv://muhammadrasi0:muhammadrasi@cluster0.dus8aq9.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client
    .connect()
    .then(() => {
      console.log("Connected to MongoDB successfully!");
      const dbname = process.env.DATABASE || "STReddiar";
      state.db = client.db(dbname);
      return state.db;
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
};

module.exports.get = function () {
  return state.db;
};