const { Pool } = require('pg');
const {
  user,
  host,
  database,
  password,
  port,
} = require('../secrets/db_configuration');

const pool = new Pool({ user, host, database, password, port }); // Doing this is exualivent to the example below. It is better to stick to this tho.
/*
{
  user: user,
  host: host,
  database: database,  
  password: password,
  host: host
}
*/

module.exports = pool;
