const db = require('../db');

const Mutations = {
    addTodo: (_,args,ctx) => {
        const query = 'INSERT INTO todo(${this:name}) VALUES(${this:csv}) RETURNING *';
        return db.query(query, args.todo)
        .then(data => {
            return data[0];
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
    editTodo: (_,args,ctx) => {
        let set = '';
        const keys = Object.getOwnPropertyNames(args.todo);
        keys.forEach(function(key,index){
            if(index === 0) set = set+key+' = \''+args.todo[key]+'\'';
            else set = set+', '+key+' = \''+args.todo[key]+'\'';
        });
        const query = 'UPDATE todo SET '+set+' WHERE id = $1 RETURNING id';
        return db.query(query, args.id)
        .then(data => {
            return data[0];
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    },
    completeTodo: (_,args,ctx) => {
        let set = '';
        const query = 'UPDATE todo SET completed=\'true\' WHERE id = $1 RETURNING id';
        return db.query(query, args.id)
            .then(data => {
                return data[0];
            })
            .catch(err => {
                console.log('catch', err);
                return 'The error is', err;
            });
    },
    deleteTodo: (_,args,ctx) => {
        const query = 'DELETE FROM todo WHERE id = $1 RETURNING id';
        return db.query(query, args.id)
        .then(data => {
            return data[0];
        })
        .catch(err => {
            console.log('catch', err);
            return 'The error is', err;
        });
    }
}

module.exports = Mutations;