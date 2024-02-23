import express, { urlencoded } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./db";

export async function initServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query{
      sayHello: String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => "Hello",
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
