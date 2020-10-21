
exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id').primary();
        table.string('rua').notNull();
        table.string('numero').notNull();
        table.string('bairro').notNull();
        table.string('cidade').notNull();
        table.string('uf').notNull(); 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('endereco');
};
