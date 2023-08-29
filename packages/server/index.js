const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4001;

// Connect to database mongodb
// Express Route
const studentRoute = require("./routes/studentsRoute");
const authRoute = require("./routes/authRoutes");

// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb+srv://toto2:qaz@cluster0.gjf3fzf.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database successfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/students", studentRoute); // Example: localhost:4001/students/create-student [setp:1]
app.use("/students",authRoute);


// PORT
const server = app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});


// definition de l'erreur 404: aucune route ou ressource existante
app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});



app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; //erreur de requete innatendu incapable à traiter, souvent lié a un pb de configuration 
  res.status(err.statusCode).send(err.message);
});
