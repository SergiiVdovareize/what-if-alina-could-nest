import { Schema } from "mongoose";
import { OwnerSchema } from "./owner.schema";
import { ManufacturerSchema } from "./manufacturer.schema";

export const CarSchema = new Schema({
    name: String,
    manufacturer: ManufacturerSchema,
    price: Number,
    firstRegistrationDate: { type: Date, default: Date.now },
    owners: [OwnerSchema]
});

