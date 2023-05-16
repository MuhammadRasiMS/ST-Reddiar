const mongoClient = require('mongodb').MongoClient;

const state = {
    db: null,
};

module.exports.connect = function (done) {
    const url =
      process.env.MONGO_URL ||
      "mongodb+srv://muhammadrasi0:muhammadrasi@cluster0.dus8aq9.mongodb.net/?retryWrites=true&w=majority";

    mongoClient.connect(url, (err, data) => {
    if (err) return done(err);

    //mongoDB name
    const dbname = process.env.DATABASE || "STReddiar";
    state.db = data.db(dbname);

     //Add return statement to call done callback after connection is established 
    return done();  
});
};
module.exports.get = function () {
    return state.db;
}