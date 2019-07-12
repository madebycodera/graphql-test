exports.up = knex =>
    knex.schema.createTable('todo_list', table => {
        table.increments().primary();
        table.string('description').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.boolean('completed').defaultTo(false);
        table.integer('priority').defaultTo(1);
    });

exports.down = knex => knex.schema.dropTable('todo_list');
