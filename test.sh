# ---- List all Todos ----
# {
#   todos{
#     description,
#     id,
#     completed,
#     priority    
#   }
# }

# ---- Show Todo by ID ----
# {
#   todo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38") {
#     description
#   }
# }

# ---- Create todo ----
# mutation {
#   addTodo (description:"New Task!", completed: false, priority: 2) {
#     description, completed, priority,id
#   }
# }

# ---- Update only priority ----
# mutation {
#   updateTodo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38", priority: 8) {
#     description, priority
#   }
# }
# ---- Update only description ----
# mutation {
#   updateTodo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38", description: "Updated Task!") {
#     description, priority
#   }
# }
# ---- Update only description and priority----
# mutation {
#   updateTodo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38", description: "Updated Task!", priority: 8) {
#     description, priority
#   }
# }

# ---- Mark Todo as complete by ID ----
# mutation {
#   completeTodo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38") {
#     completed
#   }
# }

# ---- Delete Todo by ID ----
# mutation {
#   deleteTodo(id: "019f13e0-ed06-11e9-ab14-d7b89cd5ed38") {
#     id
#   }
# }