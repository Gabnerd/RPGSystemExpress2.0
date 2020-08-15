exports.up = (knex) => {
    return knex.schema.createTable('Item', (table) => {
        table.increments("id").primary();
        table.string("atributo").notNullable();
        table.string("nome").notNullable();
        table.integer("idPlayer").notNullable().references("id").inTable("Player").onUpdate("CASCADE").onDelete("CASCADE");
    })
}

exports.down = (knex) => {
    return knex.schema.dropTable('Item');
}