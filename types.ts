import { OptionalId } from "mongodb";

export type flightModel = OptionalId<{
    origen: string,
    destino: string,
    date: string
}>

export type flight = {
    id: string,
    origen: string,
    destino: string,
    date: string
}