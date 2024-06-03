// src/schema.js

const { gql } = require("graphql-tag");
const { db } = require("../firebaseAdmin");
const jwt = require("jsonwebtoken");

console.log("ENV", process.env.JWT_SECRET_KEY);

const typeDefs = gql`
  type Query {
    getUsers: [User]
    getUser(email: String!): User
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
  }

  type User {
    id: ID
    email: String
    password: String
    role: String
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

const resolvers = {
  Query: {
    getUser: async (_, { email }) => {
      const userSnapshot = await db.collection("users").where("email", "==", email).get();
      if (userSnapshot.empty) {
        throw new Error("User not found");
      }
      const userDoc = userSnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    },
    getUsers: async () => {
      const usersSnapshot = await db.collection("users").get();
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    },
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }
      const userDoc = await db.collection("users").doc(user.id).get();
      return { id: userDoc.id, ...userDoc.data() };
    },
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const userRef = db.collection("users").doc();
      const user = { id: userRef.id, email, password, role: "user" };
      await userRef.set(user);
      return { id: userRef.id, ...user };
    },
    login: async (_, { email, password }) => {
      const userSnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get();
      if (userSnapshot.empty) {
        throw new Error("User not found");
      }
      const userDoc = userSnapshot.docs[0];
      const user = { id: userDoc.id, ...userDoc.data() };
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
      return { token, user };
    },
  },
};

module.exports = { typeDefs, resolvers };
