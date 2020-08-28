const config = require('../../knexfile');
const knex = require('knex')(config);


// devido a um maior controle sobre as migrações a linha a baixo não irá para produção
//knex.migrate.latest([config]);

module.exports = knex;