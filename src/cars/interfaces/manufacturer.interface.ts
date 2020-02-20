import { Document } from "mongoose";

export interface IManufacturer extends Document {
    readonly name: string;
    readonly phone: string;
    readonly siret: number;
}