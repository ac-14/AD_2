import { flight, flightModel } from "./types.ts";

export const fromModeltoFlight = (model: flightModel):flight => {
    return{
        id: model._id?.toString(),
        origen: model.origen,
        destino: model.destino,
        date: model.date
    }
}