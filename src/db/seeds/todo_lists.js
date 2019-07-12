exports.seed = knex =>
    knex('todo_list')
        .del()
        .then(() =>
            knex('todo_list').insert([
                {
                    description: 'Complete task',
                    createdAt: new Date(),
                    completed: false,
                    priority: 1,
                },
                {
                    description: 'Do homework',
                    createdAt: new Date(),
                    completed: true,
                    priority: 2,
                },
                {
                    description: 'Do shopping',
                    createdAt: new Date(),
                    completed: false,
                    priority: 3,
                },
                {
                    description: 'Read the book',
                    createdAt: new Date(),
                    completed: false,
                    priority: 4,
                },
                {
                    description: 'Take a rest',
                    createdAt: new Date(),
                    completed: true,
                    priority: 5,
                },
            ])
        );
