import express from "express";

const router = express.Router();

router.use('/students', require('./students/students.route'));

module.exports = router;