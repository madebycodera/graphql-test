const SORT_BY_VALUES = {
    ASC: 'asc',
    DESC: 'desc',
};

function prepareFetchTodoListQuery({ orderBy, sortBy, completed }) {
    const query = {};

    if (typeof completed !== 'undefined') {
        query.completed = completed;
    }

    if (typeof orderBy !== 'undefined') {
        query.orderBy = orderBy;

        if (typeof sortBy !== 'undefined') {
            query.sortBy = SORT_BY_VALUES[sortBy];
        } else {
            query.sortBy = SORT_BY_VALUES.ASC;
        }
    }

    return query;
}

module.exports = { prepareFetchTodoListQuery };
