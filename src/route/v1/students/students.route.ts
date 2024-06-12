import express from "express";
import {
    createStudent,
    deleteStudent,
    getStudent,
    getStudents,
    updateStudent
} from "../../../controller/v1/students.controller";

const router = express.Router();

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:uuid')
    .get(getStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

module.exports = router;