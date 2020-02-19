import { Schema } from "mongoose";

export const OwnerSchema = new Schema({
    name: String,
    purchaseDate: { type: Date, default: Date.now },
});

