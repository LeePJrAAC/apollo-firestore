// src/server.js
// dotenv
require("dotenv").config();

// apollo-server
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs, resolvers } = require("./schema/schema");
// jwt
const express = require("express");
const { expressjwt: jwtMiddleware } = require("express-jwt");

const app = express();

const authMiddleware = jwtMiddleware({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req.auth) {
      console.log("req.auth", req.auth);
      return { user: req.auth.user };
    }
  },
  introspection: true,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.DEV_PORT || 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer();
