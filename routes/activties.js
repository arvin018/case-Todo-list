var express = require("express");
const { activity } = require("../models/index");
var router = express.Router();

/* GET home page. */
//Get All
router.get("/", async (req, res) => {
  try {
    let activities = await activity.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: activities,
    });
  } catch (err) {
    res.status(500).json({message:"Internal Server Error",err});
  }
});


//Get One
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let activitiesFind = await activity.findByPk(id);
    if (!activitiesFind) {
        return res.status(404).json({
          "status": "Not Found",
          "message":`Activity with ID ${id} Not Found`
        });
      }

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: activitiesFind,
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
    let { title, email } = req.body;

    let activities = await activity.create({
      title,
      email,
    });
    res.status(201).json({
      status: "Success",
      message: "Success",
      data: activities,
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
      res.status(500).json("Internal Server Error");
    }
  }
});


//PATCH Update
router.patch("/:id", async (req, res) => {
  try {
    // console.log(req.body,"ini body");
    let id = req.params.id;
    let activitiesFind = await activity.findByPk(id);
    if (!activitiesFind) {
        return res.status(404).json({
          "status": "Not Found",
          "message":`Activity with ID ${id} Not Found`
        });
      }
    let { title, email } = req.body;
    let activities = await activity.update(
      {
        title,
        email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    let result = await activity.findOne({
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
        let activitiesfind = await activity.findByPk(id);

        if (!activitiesfind) {
          return res.status(404).json({
            "status": "Not Found",
            "message":`Activity with ID ${id} Not Found`
          });
        }

        let activities = await activity.destroy({
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
            res.status(500).json("Internal Server Error");
          }
    }
})

module.exports = router;
