// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://postgres:285882@localhost:5432/medclin',
    // connection: {
    //   database: 'medclin',
    //   user:     'postgres',
    //   password: '285882'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
