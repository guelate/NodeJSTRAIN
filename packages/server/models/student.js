const mongoose = require("mongoose");
const Schema = mongoose.Schema; //shema: use collection is like table in msql

const studentSchema = new Schema( // ou const StudtShema = new mongoose.shema ..
    //parameters
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    }
  },

  //collection (partie facultatif ?)
  {
    collection: "students",
  }
);

 module.exports = mongoose.model("Student", studentSchema); // Model: class de shéma permettant d'interrargir MangoDB