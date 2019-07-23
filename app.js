import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import mongoose from 'mongoose'

import schema from './Schemas'
import resolvers from './Resolvers'
import * as models from './Models'

const app = express()

app.use(cors())

const apolloConfig = {
  context: { models },
  typeDefs: schema,
  resolvers
}
const server = new ApolloServer(apolloConfig)

server.applyMiddleware({ app, path: '/graphql/v1/playground' })

mongoose.connection.on('connected', () => {
  console.log('Connected to DB')
})
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected')
})
mongoose.connection.on('error', err => {
  console.log('DB Connection Error: ', err)
})

mongoose
  .connect(process.env.BUYERS_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen({ port: 4001 }, () => {
      console.log('Apollo Server on http://localhost:4001/graphql/v1/playground')
    })
  })
