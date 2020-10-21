exports.up = function(knex, Promise) { 
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.string('email').notNull().unique();
        table.string('password').notNull();
        table.string('dateofbirth').notNull();
        table.string('cpf').notNull();
        table.string('sexo').notNull();
        table.boolean('admin').notNull().default(false);
        table.boolean('visible').notNull().default(true);
        table.integer('enderecoId').references('id').inTable('endereco')
    })
}
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
}