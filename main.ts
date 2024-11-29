import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {schema} from './schema.ts'
import { resolvers } from "./resolvers.ts";

// Connection URL
const MONGO_URL = Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.log("URL not stablished");
  Deno.exit(1);
}
const client = new MongoClient(MONGO_URL);

// Database Name
const dbName = 'AD_2';

await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const flightsCollection = db.collection('vuelos');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {context: async () => ({ flightsCollection })});

console.info(`Server ready at ${url}`);
