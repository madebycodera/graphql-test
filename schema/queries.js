const db = require('../db');

const Query = {
    todo: (_,{id},ctx) => {
        const query = `SELECT * FROM "todo" WHERE id=${id}`;
        return db.one(query)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
    allTodos: () => {
        const query = `SELECT * FROM "todo"`;
        return db.any(query)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
}

module.exports = Query;