// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'medclin',
    user:     'postgres',
    password: '285882'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
