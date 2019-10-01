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
    allTodos: (_,{filters},ctx) => {
        let query = `SELECT * FROM "todo"`;

        if(filters && filters.completed !== undefined)
            query = query + ' WHERE completed=\''+filters.completed+'\'';

        if(filters && filters.sort_by)
            query = query + ' ORDER BY '+filters.sort_by;

        if(filters && filters.desc)
            query = query + ' DESC';

        return db.any(query)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
    getError: (parent, args, context) => {

    },
}

module.exports = Query;