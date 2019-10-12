const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const todo = require('./models/todo')
const db = require('./db')

const app = express()

db.authenticate()
  .then(() => {
    todo.create({
      description: "dummy task",
      priority: 1,
      completed: false
    })
  })
  .catch(err => console.log(err))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, () => console.log(`API app running on http://localhost:3000`))
