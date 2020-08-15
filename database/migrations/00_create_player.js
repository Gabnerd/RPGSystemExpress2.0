exports.up = (knex) => {

    return knex.schema.createTable('Player', (table) => {
        table.increments("id").primary();
        table.string("nome").notNullable();
        table.integer("forca").notNullable();
        table.integer("destreza").notNullable();
        table.integer("constituicao").notNullable();
        table.integer("vidaMaximo").notNullable();
        table.integer("vidaMinimo").notNullable();
        table.integer("inteligencia").notNullable();
        table.integer("manaMaximo").notNullable();
        table.integer("manaMinimo").notNullable();
        table.integer("perspicacia").notNullable();
        table.integer("movimento").notNullable();
        table.integer("carisma").notNullable();
        table.integer("primeSocor").notNullable();
        table.integer("level").notNullable();
        table.integer("sanidade").notNullable();
        table.integer("moedas").notNullable();
        table.integer("luta").notNullable();
    });

}

exports.down = (knex) => {
    return knex.schema.dropTable('player');
}