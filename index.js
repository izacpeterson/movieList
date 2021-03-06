/** @format */

const express = require("express");
const app = express();
var mongoose = require("mongoose");
const URISTR =
  "mongodb+srv://izac:izac1122@cluster0.kewyg.mongodb.net/movieList?retryWrites=true&w=majority";
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB conection error:"));
app.use(express.json());

app.use(express.static("public"));

//Schema
let Schema = mongoose.Schema;

let modelSchema = new Schema({
  user: String,
  movies: [],
});

// let test_movie = new model({ user: "ryee" });
// test_movie.save((err) => {
//   if (err) return handleError(err);
// });

app.get("/api/getUser", (req, res) => {
  let model = mongoose.model("model", modelSchema);

  console.log(req.query.user);
  let username = req.query.user;
  model.findOne({ user: username }, "user movies", (err, user) => {
    console.log(user);
    res.send(user);
  });
});
app.post("/api/addMovie", (req, res) => {
  let model = mongoose.model("model", modelSchema);

  model.findOne({ user: req.body.user }, (err, user) => {
    user.movies.push(req.body.movie);
    user.save();
    res.send(user);
  });

  //   res.send("received");
});
app.post("/api/newUser", (req, res) => {
  let new_user = new model({ user: req.body.user });
  new_user.save();
  console.log(req.body.user);
  res.send("logged");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port");
});
