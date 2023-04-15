var express = require('express');
const { todo } = require("../models/index");
var router = express.Router();

//GET ALL
router.get("/", async (req, res) => {
    try {
      let todos = await todo.findAll();

      res.status(200).json({
        status: "Success",
        message: "Success",
        data: todos,
      });

    } catch (err) {
        console.log(err,"err");
      res.status(500).json({message:"Internal Server Error",err});
    }
  });


  
//Get One
router.get("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let todoFind = await todo.findByPk(id);
      if (!todoFind) {
          return res.status(404).json({
            "status": "Not Found",
            "message":`Activity with ID ${id} Not Found`
          });
        }
  
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: todoFind,
      });
    } catch (err) {
      console.log(err,"error");
      res.status(500).json("Internal Server Error");
    }
  });


  //Post Create
router.post("/", async (req, res) => {
    try {
      // console.log(req.body,"ini body");
      let { title, activity_group_id,is_active } = req.body;
  
      let todos = await todo.create({
        title,
        activity_group_id,
        is_active,
        priority:"very-high"  
      });
      res.status(201).json({
        status: "Success",
        message: "Success",
        data: todos,
      });
    } catch (err) {
      // console.log(err,"error>>>");
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ 
          "status": "Bad Request",
          message: err.errors[0].message });
      } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ 
          "status": "Bad Request",
          message: err.errors[0].message });
      } else {
        res.status(500).json({message:"Internal Server Error"});
      }
    }
  });


  //PATCH Update
router.patch("/:id", async (req, res) => {
    try {
      // console.log(req.body,"ini body");
      let id = req.params.id;
      let todoFind = await todo.findByPk(id);
      if (!todoFind) {
          return res.status(404).json({
            "status": "Not Found",
            "message":`Activity with ID ${id} Not Found`
          });
        }
      let { title, priority,is_active,status } = req.body;
      let todos = await todo.update(
        {
          title,
          priority,
          is_active,
          status
        },
        {
          where: {
            id: id,
          },
        }
      );
      let result = await todo.findOne({
          where:{
              id: id,
          }
      })
    
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: result,
      });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ 
          "status": "Bad Request",
          message: err.errors[0].message });
      } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ 
          "status": "Bad Request",
          message:err.errors[0].message });
      } else {
        console.log(err);
        res.status(500).json({message:"Internal Server Error",err});
      }
    }
  });
  
  //DEL Delete
router.delete("/:id", async(req,res)=>{
    try{
        let id = req.params.id;
        // console.log(id,"id");
        let todoFind = await todo.findByPk(id);

        if (!todoFind) {
          return res.status(404).json({
            "status": "Not Found",
            "message":`Activity with ID ${id} Not Found`
          });
        }

        let todos = await todo.destroy({
            where:{
            id:id
            }
        })
        res.status(200).json({
            status: "Success",
            message: "Success",
            data: {},
          });
    }catch(err){
        if (err.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({
                "status": "Bad Request",
                message: err.errors[0].message });
          } else if (err.name === "SequelizeValidationError") {
            res.status(400).json({ message: err.errors[0].message });
          } else {
            res.status(500).json({message:"Internal Server Error",err});
          }
    }
})


module.exports = router;
