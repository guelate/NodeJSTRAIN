const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');


const router = express.Router();
let studentSchema = require("../models/student");

router.post("/authentification/signup", async (req, res, next) => {

  
    try {
      if (!req.body.name && !req.body.email && !req.body.password) {
        return next({
          message: 'Need authentification params',
          statusCode: 400,
        });
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const student = await studentSchema.create({
        ...req.body,
        password: hashPassword,
      });
      
      // console.log("ajout", student);
      // res.json(student);
  
      const privateKey = fs.readFileSync("jwtRS256.key");
      // Chercher comment creer une clé privée et publique pour JWT
      jwt.sign(
        { name: student.name, email: student.email, password:student.password, role: "user" }, // Payload --> base de donnée
        privateKey, // Mot secretadmin
        { algorithm: "RS256" }, // Header
        function (err, token) {
          return res.json({
            token,
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  });

  

module.exports = router;
