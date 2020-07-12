# Get all todo listing
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"{\n  todosList {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Create a todo item
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation {\n  createTodo(description: \"John Agbadu\"\n    priority: 5\n  ){\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Update todo item
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation {\n  updateTodo(id: \"6db72dc4d2db276d95bf\", description: \"Cook and do dishes\",priority: 4){\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Mark todo item as completed
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation {\n  markComplete(id: \"ca34b05fc032794967c3\",\n    completed: true){\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Delete todo item
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation {\n  deleteTodo(id: \"7c6ca684bb204db91269\"){\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Sort list in ASC by priority
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"{\n  todosList(sortBy: {field: \"priority\", order: ASC}) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

# Sort list in DESC by priority
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"{\n  todosList(sortBy: {field: \"priority\", order: DESC}) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed