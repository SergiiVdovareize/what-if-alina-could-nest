import { IManufacturer } from "../interfaces/manufacturer.interface";
import { IOwner } from "../interfaces/owner.interface";

export class CreateCarDTO {
    readonly name: string;
    readonly manufacturer: IManufacturer;
    readonly price: number;
    readonly firstRegistrationDate: Date;
    readonly owners: Array<IOwner>;
}