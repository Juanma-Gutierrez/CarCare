import { Injectable } from '@angular/core';
import { MappingService } from '../mapping.service';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { StrapiExtendedUser } from './interfaces/strapi-data';
import { User } from './interfaces/strapi-users';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

@Injectable({
    providedIn: 'root'
})

export class StrapiMappingService extends MappingService {
    public override queryVehiclesUrl(): string {
        throw new Error('Method not implemented.');
    }
    public override getVehicleUrl(id: number): string {
        throw new Error('Method not implemented.');
    }
    public override updateVehicleUrl(id: number): string {
        throw new Error('Method not implemented.');
    }
    public override deleteVehicleUrl(id: number): string {
        console.log("deleteVehicleUrl")
        return `api/vehicles/${id}`;
    }
    public override mapVehicle(data: any): Vehicle {
        throw new Error('Method not implemented.');
    }
    public override mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle> {
        const strapi_data: PaginatedData<Vehicle> = { ...data };
        return {
            data: strapi_data.data.map(vehicle => {
                return {
                    id: vehicle.id,
                    plate: vehicle.plate,
                    brand: vehicle.brand,
                    model: vehicle.model,
                    registrationDate: vehicle.registrationDate,
                    category: vehicle.category,
                    available: vehicle.available,
                    owner: vehicle.owner,
                    spents: vehicle.spents
                };
            }),
            pagination: data.pagination
        };
    }


    constructor() {
        super();
    }


    public  mapUser(data: StrapiExtendedUser): User {
        return {
            id: data.id || 0,
            username: data.nickname || "",
            email: "",
            provider: "",
            confirmed: false,
            blocked: false,
            createdAt: "",
            updatedAt: "",
        };
    }
}

