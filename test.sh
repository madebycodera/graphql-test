BLUE='\033[1;36m'
NC='\033[0m' # No Color

echo "${BLUE}Get all todos${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"query {\n\tgetTodoList {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

echo "${BLUE}Get all todos with sorting and filtering${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"query {\n\tgetTodoList(input: { orderBy: \"createdAt\", sortBy: DESC, completed: false }) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

echo "${BLUE}Create new todo${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n  createTodo(description: \"Some todo\", priority: 100) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

echo "${BLUE}Update todo with ID 1${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n  updateTodo(id: 1, description: \"Updated todo\", priority: 10) {\n    id\n    description\n    createdAt\n    completed\n    priority\n  }\n}"}' --compressed

echo "${BLUE}Mark todo with ID 2 as completed${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n\tmarkTodoComplete(id: 2) {\n    message\n  }\n}"}' --compressed

echo "${BLUE}Delete todo with ID 3${NC}"
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n\tdeleteTodo(id: 3) {\n    message\n  }\n}"}' --compressed


