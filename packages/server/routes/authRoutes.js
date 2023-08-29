const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();

router.get("/login", async (req, res, next) => {

  // On suppose que l'utilisateur a envoyé un login et un mot de passe

  try {
    const privateKey = fs.readFileSync('jwtRS256.key');
    jwt.sign(
      { name: "killian", email: "killian@yahoo.fr" }, // Payload --> base de donnée
      privateKey, // Mot secret
      { algorithm: "RS256" }, // Header
      function (err, token) {
        return res.json({
            token
        })
      }
      );
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
