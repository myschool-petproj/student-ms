import db from "../../db/db";
import {
    TABLES,
    COMMON,
    STUDENTS
} from "../../../db/constants/db_constants"

export const getRecords = async () => {
    return db(TABLES.students).select(COMMON.id, STUDENTS.first_name, STUDENTS.last_name).where(COMMON.is_deleted, 0);
};

export const getRecord = async (id: string) => {
    return db(TABLES.students).select(COMMON.id, STUDENTS.first_name, STUDENTS.last_name).where({
        id: id,
        is_deleted: 0
    });
};

export const createRecord = async ({first_name, last_name}) => {
    return db(TABLES.students).insert({first_name, last_name}).returning('id');
};

export const updateRecord = async (id: string, payload: any) => {
    let request: { first_name?: any; last_name?: any; } = {};
    if (payload.first_name) request.first_name = payload.first_name;
    if (payload.last_name) request.last_name = payload.last_name;
    return db(TABLES.students).update(request).where({
        id: id,
        is_deleted: 0
    }).returning('id');
};

export const deleteRecord = async (id: string) => {
    return db(TABLES.students).update({is_deleted: 1}).where({
        id: id,
        is_deleted: 0
    }).returning('id');
};