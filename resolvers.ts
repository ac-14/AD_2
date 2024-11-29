import { Collection, ObjectId } from "mongodb";
import { flight, flightModel } from "./types.ts";
import { fromModeltoFlight } from "./utils.ts";

export const resolvers = {
    Query: {
        getFlights: async(_:unknown, args: {origen?:string, destino?: string}, context: {flightsCollection: Collection<flightModel>}):Promise<flight[]> => {
            if(args.origen && args.destino){
                const flightsDB = await context.flightsCollection.find({
                    origen: args.origen,
                    destino: args.destino
                }).toArray();

                const flights = flightsDB.map((f) => fromModeltoFlight(f));
                return flights;
            } else if(args.origen){
                const flightsDB = await context.flightsCollection.find({
                    origen: args.origen,
                }).toArray();

                const flights = flightsDB.map((f) => fromModeltoFlight(f));
                return flights;
            } else if(args.destino){
                const flightsDB = await context.flightsCollection.find({
                    destino: args.destino
                }).toArray();

                const flights = flightsDB.map((f) => fromModeltoFlight(f));
                return flights;
            }

            const flightsDB = await context.flightsCollection.find().toArray();
            const flights = flightsDB.map((f) => fromModeltoFlight(f));
            return flights;

        },

        getFlight: async(_:unknown, {id}: {id: string},context: {flightsCollection: Collection<flightModel>}):Promise<flight | null> => {
            const flightDB = await context.flightsCollection.findOne({_id: new ObjectId(id)});
            if(flightDB){
            const flight = fromModeltoFlight(flightDB);
            return flight;
            }

            return null;
        }
    },

    Mutation: {
        addFlight: async(_:unknown, args: {origen:string, destino: string, date: string}, context: {flightsCollection: Collection<flightModel>}):Promise<flight> => {
            const {insertedId} = await context.flightsCollection.insertOne({
                origen: args.origen,
                destino: args.destino,
                date: args.date
            })

            return {
                id: insertedId,
                origen: args.origen,
                destino: args.destino,
                date: args.date
            }
        }

    }
}