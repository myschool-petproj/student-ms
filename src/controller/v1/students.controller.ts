import express from "express";
import * as studentService from '../../service/v1/student.service'
import {body, param, validationResult} from "express-validator";


export const getStudents = [
    async (req: express.Request, res: express.Response) => {
        try {
            let result = await studentService.getRecords();
            return res.status(200).json({students: result, total: result.length})
        } catch (e) {
            return res.status(500).json(e);
        }
    }
];

export const getStudent = [
    param("uuid").isUUID().withMessage("UUID is required"),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()});
        }
        try {
            let result = await studentService.getRecord(req.params.uuid);
            if (!result.length) {
                return res.status(404).json({message: `record not found`});
            }
            return res.status(200).json(result[0]);
        } catch (e) {
            return res.status(500).json(e)
        }
    }
];

export const createStudent = [
    body('first_name').notEmpty().withMessage("field required"),
    body('first_name').isString().withMessage("field should be a string"),
    body('last_name').notEmpty().withMessage("field required"),
    body('last_name').isString().withMessage("field should be a string"),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()});
        }
        try {
            let result = await studentService.createRecord({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            });
            return res.status(201).json((await studentService.getRecord(result[0].id))[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
];

export const updateStudent = [
    param("uuid").isUUID().withMessage("UUID is required"),
    body('first_name').isString().optional().withMessage("field should be a string"),
    body('last_name').isString().optional().withMessage("field should be a string"),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()});
        }
        try {
            if (!Object.keys(req.body).length
                || !(req.body.first_name || req.body.last_name)) {
                return res.status(400).json({errors: "body is required"});
            }
            let record = await studentService.getRecord(req.params.uuid);
            if (!record.length) {
                return res.status(404).json({message: `record not found`});
            }
            let updatedId = await studentService.updateRecord(req.params.uuid, req.body);
            let result = await studentService.getRecord(updatedId[0].id);
            return res.status(200).json(result[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
];

export const deleteStudent = [
    param("uuid").isUUID().withMessage("UUID is required"),
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()});
        }
        try {
            let record = await studentService.getRecord(req.params.uuid);
            if (!record.length) {
                return res.status(404).json({message: `record not found`});
            }
            await studentService.deleteRecord(req.params.uuid);
            return res.status(204).json();
        } catch (e) {
            return res.status(500).json(e);
        }
    }
]