import { Document } from "mongoose";

export interface IOwner extends Document {
    readonly name: string;
    readonly purchaseDate: Date;
}