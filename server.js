require('./Libs/logger.lib')

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'

import schema from './Schemas'
import resolvers from './Resolvers'
import * as models from './Models'

const app = express()

const server = new ApolloServer({
    context: { models },
    typeDefs: schema,
    resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

mongoose.connection.on('connected', () => {
    logger.event('Connected to DB')
})
mongoose.connection.on('disconnected', () => {
    logger.event('Disconnected from DB')
})
mongoose.connection.on('error', err => {
    logger.event('DB Connection Error: ', err)
})

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        app.listen({ port: 4001 }, () => {
            logger.event('Apollo Server on http://localhost:4001/graphql')
        })
    })
