import { Schema } from "mongoose";

export const ManufacturerSchema = new Schema({
    name: String,
    phone: String,
    siret: Number,
});

