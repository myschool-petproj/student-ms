import express from "express";

const router = express.Router();

router.use('/v1', require('./v1/v1.route'));

module.exports = router;