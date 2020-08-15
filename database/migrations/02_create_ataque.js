exports.up = (knex) => {
    return knex.schema.createTable('Ataque', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('atributos').notNullable();
        table.string('custo').notNullable();
        table.integer('idPlayer').notNullable().references('id').inTable('Player').onUpdate('CASCADE').onDelete('CASCADE');
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('Ataque');
}