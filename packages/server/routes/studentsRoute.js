const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();

let studentSchema = require("../models/student");

// Créer un vrai systeme d'authentification en utilisant le fichier authRoutes

router.post("/create-student", async (req, res, next) => {
  try {
    const student = await studentSchema.create(req.body);
    console.log("ajout", student);
    // res.json(student);

    const privateKey = fs.readFileSync("jwtRS256.key");
    jwt.sign(
      { name: student.name, email: student.email, role: "admin" }, // Payload --> base de donnée
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

router.get("/", async (req, res, next) => {
  try {
    const students = await studentSchema.find();

    res.json(students);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:deletedValue", async (req, res, next) => {
  try {
    const getHeaders = req.get("Authorization");
    const tokens = getHeaders.split(" ");
    const bearerToken = tokens[1];
    console.log("Authorization", bearerToken);

    //quand on creer un token: clé privée / quand on veux verifier un token: clée public
    // 1 - verify le token envoyé
    var cert = fs.readFileSync("jwtRS256.key.pub"); // get public key
    jwt.verify(bearerToken, cert, function (err, decoded) {
      console.log(decoded, err); // bar
    }); 

    // 2 - verifier le role qui se trouve danparamss le token (si l'utilisateur est admin alors delete ok)

    const data = await studentSchema.deleteOne({
      name: req.params.deletedValue,
    });
    console.log("supprime", data);
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

router.put("/:putedValue", async (req, res, next) => {
  const { putedValue } = req.params; // recupere moi la valeur segmenté envoyé depuis le front
  console.log(putedValue);

  try {
    const data = await studentSchema.findOneAndUpdate(
      { name: putedValue },
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      }
    );
    console.log("update....", data);
    res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

/*
  METHOD HTTP: POST, GET, PUT, DELETE, PATCH...

  POST -- Utiliser lorsqu'on ajoute une ressource ex: Créer un compte utilisateur
  GET -- Utiliser pour récupérer une ou des ressources ex: Récupérer la liste des utilisateurs de son site
  PUT -- Utiliser lorsqu'on souhaite modifier entièrement les données d'une ressource ex: Modifier toutes ces données personnelles sur Instagram
  PATCH --  Utiliser lorsqu'on souhaite modifier partiellement les données d'une ressource ex: Modifier juste son mot de passe utilisateur
  DELETE -- utiliser pour supprimer une ressource

  Mettons en application le CRUD à partir des méthod HTTP
  Dans notre exemple, on a une api qui s'appelle https://harvard.com

  Ici, l'url qui concerne tous les élèves de l'école Harvard est la suivante https://harvard.com/students

  --> Liste des élèves de harvard
  GET https://harvard.com/students

  --> Ajouter un élève dans l'école
  POST https://harvard.com/students

  --> Récupérer l'élève Killian dans la base de données qui a pour identifiant "ID7458566"
  GET https://harvard.com/students/ID7458566
  (dans express router.get https://harvard.com/students/:identifiant)

  --> Supprimer l'élève Killian dans la base de données qui a pour identifiant "ID7458566"
  DELETE https://harvard.com/students/ID7458566

  --> Modifier l'élève Killian dans la base de données qui a pour identifiant "ID7458566"
  PUT https://harvard.com/students/${parametre} -> value.name -> killian 
  (dans express router.put https://harvard.com/students/:identifiant) req.params.identifiant



explication: methode put / delete

Dans notre exemple, lorsque vous accédez à l'URL /books/123 (cote front), Express associe cette URL à la route '/books/:id' (cote back)
et extrait la valeur 123 du segment de l'URL correspondant au paramètre id. L'objet req.params ressemblera alors à { id: '123' }.
Vous pouvez accéder à la valeur du paramètre id en utilisant req.params.id. Par exemple, si vous souhaitez mettre à jour un 
livre avec l'ID spécifié dans l'URL, vous pouvez utiliser const id = req.params.id; pour stocker cette valeur dans une variable.

avec mes mots:
segmente moi ce qui est envoyé depuis le front (url segmenté par /:) et passe le variable grâce à req.params (var = req.params)

req.params -> methode pour accéder à la vlr d'un params
*/
