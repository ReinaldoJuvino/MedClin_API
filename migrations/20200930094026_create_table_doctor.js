
exports.up = function(knex) {
    return knex.schema.createTable('doctor', table => {
        table.increments('id').primary();
        table.string('crm').notNull().unique();
        table.string('specialty').notNull();
        table.integer('userId').references('id').inTable('users') 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doctor');
};
