const {TABLES, COMMON, STUDENTS} = require("../constants/db_constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable(TABLES.students, table => {
        table.uuid(COMMON.id).primary().unique().defaultTo(knex.fn.uuid());
        table.string(STUDENTS.first_name).notNullable();
        table.string(STUDENTS.last_name).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable(TABLES.students);
};
