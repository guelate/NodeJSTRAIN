const express = require("express");
const router = express.Router();

// Student Model
let studentSchema = require("../models/student");

// CREATE Student
router.post("/create-student", async (req, res, next) => {
  try {
    const student = await studentSchema.create(req.body);
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
    const data = await studentSchema.deleteOne(req.params.name);
    res.json(data)
  } catch (error){
    return next(error)
  }
})


router.put('/:putedValue', async(req,res,next) => {


// `doc` is the document _before_ `update` was applied
// const filter = { name: 'Jean-Luc Picard' };
// const update = { age: 59 };
// let doc = await Character.findOneAndUpdate(filter, update);
// doc.name; // 'Jean-Luc Picard'
// doc.age; // undefined

// https://mongoosejs.com/docs/tutorials/findoneandupdate.html

  try {
    const data = await studentSchema.findOneAndUpdate(req.params.name, { 
      name: req.body.name,
      email: req.body.email
    }, {
      new: true
    });

    console.log(JSON.stringify({ data }, null, 2));
    console.log(JSON.stringify({ paramsName: req.params.name }, null, 2));
    console.log(JSON.stringify({ email: req.body.email }, null, 2));
    console.log(JSON.stringify({ name: req.body.name }, null, 2));

    res.json(data)
  }catch(error){
    return next(error)
  }
})


module.exports = router;
