const db = require('../db');

const Query = {
    todo: (_,{id},ctx) => {
        const query = `SELECT * FROM "todo" WHERE id=${id}`;
        console.log('todo', id,ctx, query);
        return db.one(query)
        .then(data => {
            console.log('then', data);
            return data;
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
    allTodos: () => {
        const query = `SELECT * FROM "todo"`;
        console.log('allTodos', query);
        return db.any(query)
        .then(data => {
            console.log('then', data);
            return data;
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
}

module.exports = Query;