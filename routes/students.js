const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const myPath = path.join(__dirname, "../data/students.json");
const Joi = require("@hapi/joi");

// - GET (all, individual)
router.get("/", (req, res) => {
  fs.readFile(myPath, "utf-8", (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data));
  });
});

router.get("/:name", (req, res) => {
  fs.readFile(myPath, "utf-8", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    const student = data.find(
      ({ name }) => name.toLowerCase() === req.params.name.toLowerCase()
    );

    if (student) {
      return res.status(200).json(student);
    }

    res.status(404).json({ error: "Student not found" });
  });
});

// - PUT (individual)
router.put("/:name", (req, res) => {
  fs.writeFile(myPath, "utf-8", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    if (req.params.name && req.body) {
      data = data.map(student => {
        if (student.name.toLowerCase() === req.params.name.toLowerCase()) {
          Object.assign(student, req.body);
        }

        return student;
      });
    }
    res.send(data);
  });
});

// - DELETE (individual)
router.delete("/:name", (req, res) => {
  fs.writeFile(myPath, "utf-8", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    if (req.params.name) {
      data = data.filter(
        ({ name }) => name.toLowerCase() !== req.params.name.toLowerCase()
      );
    }

    res.send(data);
  });
});

// - POST (individual)
router.post("/", (req, res) => {
  fs.writeFile(myPath, "utf-8", (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    if (req.body) {
      data.push(req.body);
      return res.send({
        status: "success",
        message: `student with name: ${req.body.name} added`
      });
    }

    res.send("NO!");
  });
});

module.exports = router;
