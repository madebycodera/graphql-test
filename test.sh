echo " - creates a new Todo and returns all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"  mutation {\n    createTodo(description: \"New task\", priority: 1) {\n      id\n      description\n      priority\n      completed\n      createdAt\n    }\n  }"}' --compressed

echo "\n - updates the description and priority columns, and returns all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"  mutation {\n    updateTodo(id: 1, description: \"Task updated\",priority: 6) {\n      id\n      description\n      priority\n      completed\n      createdAt\n    }\n  }"}' --compressed

echo "\n - updates the priority column and returns only the priority column\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"  mutation {\n    updateTodo(id: 1, priority: 6) {\n      priority\n    }\n  }"}' --compressed

echo "\n - marks a todo as completed and returns the id, description, and completed columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"  mutation {\n    completeTodo(id: 1) {\n      id\n      description\n      completed\n    }\n  }"}' --compressed

echo "\n - getting one register and returning all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query one {\n  todo(id: 1) {\n    id\n    description\n    completed\n    priority\n    createdAt\n  }\n  \n}"}' --compressed

echo "\n - getting all records with unsortered list and all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query all {\n  todos {\n    id\n    description\n    completed\n    priority\n    createdAt\n  }\n}"}' --compressed

echo "\n - getting all records unordered with all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query all {\n  todos(sortedBy: \"createdAt\", order: DESC) {\n    id\n    description\n    completed\n    priority\n    createdAt\n  }\n}"}' --compressed

echo "\n - getting all records, ordered per priority (ascending), and returns  all columns\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query all {\n  todos(sortedBy: \"priority\") {\n    id\n    description\n    completed\n    priority\n    createdAt\n  }\n}"}' --compressed

echo "\n - getting all completed records, unordered , and returns all columns, except completed column.\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query all {\n  todos(completed: true) {\n    id\n    description\n    priority\n    createdAt\n  }\n}"}' --compressed

echo "\n - getting all completed records, ordered with priority (ascending), and return all columns, except completed column.\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query all {\n  todos(completed: true, sortedBy: \"priority\", order: ASC) {\n    id\n    description\n    priority\n    createdAt\n  }\n}"}' --compressed

echo "\n - deleting a todo\n"
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"  mutation {\n    deleteTodo(id: 1)\n  }"}' --compressed

