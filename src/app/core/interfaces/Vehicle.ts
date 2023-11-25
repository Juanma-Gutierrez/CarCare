import { PaginatedData } from "./data";

export interface Vehicle {
    id: number,
    plate: string,
    brand: string,
    model: string,
    registrationDate: Date,
    category: VehicleCategory,
    available: boolean,
    owner: string,
    spents?: []
}

export enum VehicleCategory {
    car = 'Coche',
    motorcycle = 'Motocicleta',
    van = 'Furgoneta',
    truck = 'Camión'
}

export type PaginatedVehicles = PaginatedData<Vehicle>;


