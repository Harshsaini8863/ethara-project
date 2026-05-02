const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.post("/create", async (req,res)=>{
  const project = await Project.create(req.body);
  res.json(project);
});

router.get("/", async (req,res)=>{
  const data = await Project.find();
  res.json(data);
});

module.exports = router;