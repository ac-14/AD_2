export const schema = `#graphql
    type flight {
        id: ID!,
        origen: String,
        destino: String,
        date: String,
    }

    type Query {
        getFlights(origen: String, destino: String):[flight!]!
        getFlight(id: ID!):flight
    }

    type Mutation {
        addFlight(origen: String!, destino: String!, date: String!):flight!
    }
`
