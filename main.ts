import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {schema} from './schema.ts'
import { resolvers } from "./resolvers.ts";
import { flightModel } from "./types.ts";

// Connection URL
const MONGO_URL = Deno.env.get("MONGO_URL");

const client = new MongoClient(MONGO_URL);

// Database Name
const dbName = 'AD_2';

await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const flightsCollection = db.collection<flightModel>('vuelos');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {context: async () => ({ flightsCollection })});

console.info(`Server ready at ${url}`);
