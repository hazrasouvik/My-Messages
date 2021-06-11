const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

app.use("/", express.static(path.join(__dirname, "../dist/mean-course")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/mean-course/index.html"));
});

mongoose.connect("mongodb+srv://max:" + process.env.MONGO_ATLAS_PW + "@cluster0.trckj.mongodb.net/node-angular?retryWrites=true&w=majority") //nodemon.js has the environment variables for Node
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed!')
});

/*app.use((req, res, next) => {
  console.log('First Middleware');
  next(); //Passing the request to next middleware, it is import to pass the request to next middleware if we don't send a response
  res.send('Hello from Express!');//This will send response to the client and implicitly end the response as well, if we don't pass it to the next middleware, we should send a response.
});*/
app.use(bodyParser.json()); //Parses the HTTP request body into a JSON object for us to get access to the POST data
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); //Parses the URL encoded data
// app.use(express.urlencoded());
app.use("/images", express.static(path.join(__dirname, "backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);


module.exports = app; //To export something, this also exports the middleware used here
