import { Document } from "mongoose";
import { IOwner } from "./owner.interface";
import { IManufacturer } from "./manufacturer.interface";

export interface ICar extends Document {
    readonly name: string;
    readonly manufacturer: IManufacturer;
    readonly price: number;
    readonly firstRegistrationDate: Date;
    readonly owners: Array<IOwner>;
}