const todosDatabase = []

const resolvers = {
	Query: {
		todosList: (_, { sortBy }) => {
			if (sortBy) {
				if (sortBy.order === 'ASC') {
					todosDatabase.sort(function (a, b) {
						return a[sortBy.field] - b[sortBy.field];
					});
				}
				if (sortBy.order === 'DESC') {
					todosDatabase.sort(function (a, b) {
						return b[sortBy.field] - a[sortBy.field];
					});
				}
			}
			return todosDatabase;
		}
	},
	Mutation: {
		createTodo: (_, { description, priority }) => {
			let id = require('crypto').randomBytes(10).toString('hex');
			const todoItem = {
				id,
				description: description,
				createdAt: Date.now,
				completed: false,
				priority: !priority ? 1 : priority,
			};
			todosDatabase.push(todoItem);
			return todoItem;
		},
		updateTodo: (_, { id, description, priority }) => {
			const todo = todosDatabase.find(todo => todo.id === id);

			if (priority) todo.priority = !priority ? 1 : priority;
			if (description) todo.description = description;

			return todo;
		},
		markComplete: (_, { id, completed }) => {
			const todo = todosDatabase.find(todo => todo.id === id);
			todo.completed = completed;
			return todo;
		},
		deleteTodo: (_, { id }) => {
			const todoIndex = todosDatabase.findIndex(todo => todo.id == id);
			const todo = todosDatabase[todoIndex];
			todosDatabase.splice(todoIndex, 1);
			return todo;
		}
	}
};

export default resolvers;