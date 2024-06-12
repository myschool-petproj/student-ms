const {
    TABLES,
    COMMON
} = require("../constants/db_constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    let hasTable = await knex.schema.hasTable(TABLES.students);
    if (hasTable) {
        await knex.schema.alterTable(TABLES.students, table => {
            table.boolean(COMMON.is_deleted).notNullable().defaultTo(0);
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable(TABLES.students, table => {
        table.dropColumn(COMMON.is_deleted);
    });
};
