import { MongoClient } from "mongodb";
const uri = process.env.URI;
// Cache the MongoDB client to reuse across function calls
let cachedClient;
let cachedPromise;
export async function getClient() {
  if (cachedClient) {
    return cachedClient;
  }
  if (!cachedPromise) {
    const client = new MongoClient(uri);
    cachedPromise = client.connect();
  }
  cachedClient = await cachedPromise;
  console.log("MongoDB client connected");
  return cachedClient;
}
// Alternative approach using global variable to cache the MongoDB client
// let globalWithMongo = global;

// if (!globalWithMongo._mongo) {
//   globalWithMongo._mongo = {
//     client: null,
//     promise: null,
//   };
// }

// export async function getClient() {
//   if (globalWithMongo._mongo.client) {
//     return globalWithMongo._mongo.client;
//   }

//   if (!globalWithMongo._mongo.promise) {
//     const client = new MongoClient(uri);
//     globalWithMongo._mongo.promise = client.connect();
//   }

//   globalWithMongo._mongo.client = await globalWithMongo._mongo.promise;
//   return globalWithMongo._mongo.client;
// }
