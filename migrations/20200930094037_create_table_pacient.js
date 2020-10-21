
exports.up = function(knex) {
    return knex.schema.createTable('pacient', table => {
        table.increments('id').primary();
        table.string('comorbidities').notNull();
        table.string('healthplan').notNull();
        table.integer('userId').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pacient');
};
