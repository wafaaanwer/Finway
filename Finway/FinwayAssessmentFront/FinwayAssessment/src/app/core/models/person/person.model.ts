import { CountryModel } from "../country/country.model";

export interface PersonModel{
    id?: number;
    name?:string;
    email?:string;
    dateOfBirh?:Date,
    country?: CountryModel,
    image?:File
}