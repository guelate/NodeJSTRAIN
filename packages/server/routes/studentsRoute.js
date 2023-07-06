const express = require("express");
const router = express.Router();

// Student Model
let studentSchema = require("../models/student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    const student = await studentSchema.create(req.body);
    console.log("ajout",student)
    res.json(student);
  } catch (error) {
    return next(error);
  }

});

// READ Students [step:2]
router.get("/", async (req, res, next) => {
  try {
    const students = await studentSchema.find();

    res.json(students);
  } catch (error) {
    return next(error);
  }

});

router.delete('/:deletedValue', async(req,res,next) => {
  
  try {
    const data = await studentSchema.deleteOne({name:req.params.deletedValue});
    console.log("supprime",data)
    res.json(data)
  } catch (error){
    return next(error)
  }
})


router.put('/:putedValue', async(req,res,next) => {

  // console.log("current data",JSON.stringify(req.params,null, 2))
  
  // console.log("new data",req.body)
  
  const {putedValue} = req.params; // recupere moi putedValue(=value.name) qui est dans req.params envoyé depuis le front
  // console.log("value",JSON.stringify(putedValue, null, 2))

  try {
    const data = await studentSchema.findOneAndUpdate({name:putedValue}, { 
      name: req.body.name,
      email: req.body.email
    }, {
      new: true
    });
    console.log("update....")
    res.json(data)
  }catch(error){
    return next(error)
  }
})


module.exports = router;


// router.put('/:putedValue', async(req,res,next) => {

//   try {
//     const data = await studentSchema.findOneAndUpdate(req.params.name, { 
//       name: req.body.name,
//       email: req.body.email
//     }, {
//       new: true
//     });
//     console.log("update....")
//     res.json(data)
//   }catch(error){
//     return next(error)
//   }
// })


// router.put('/:putedValue', async(req,res,next) => {

//   try {
//     const data = await studentSchema.findOneAndUpdate(req.params.email, { 
//       name: req.body.name,
//       email: req.body.email
//     }, {
//       new: true
//     });
//     console.log("update....")
//     res.json(data)
//   }catch(error){
//     return next(error)
//   }
// })




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

*/