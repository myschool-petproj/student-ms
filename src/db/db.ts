import knex from 'knex';
import knexConfig from '../../knexfile'

const env = process.env.NODE_ENV;
const config = knexConfig[env];

const db = knex(config);

export default db;