exports.up = (knex) => {
    return knex.schema.createTable('Exposicao', (table) => {
        table.increments("id").primary();
        table.string('inimigo').notNullable();
        table.string('valor').notNullable();
        table.integer('idPlayer').notNullable().references('id').inTable('Player').onUpdate('CASCADE').onDelete('CASCADE');
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('Exposicao');
}