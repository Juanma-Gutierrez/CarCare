import { Injectable } from '@angular/core';
import { MappingService } from '../mapping.service';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { StrapiOwner, User } from './interfaces/strapi-users';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { Provider, ProviderItem } from './interfaces/strapi-providers';

@Injectable({
    providedIn: 'root'
})

export class StrapiMappingService extends MappingService {

    constructor() {
        super();
    }
    public override queryVehiclesUrl(): string {
        console.log("querytVehicleUrl")
        return 'vehicles?sort=brand';
    }
    public override getVehicleUrl(id: number): string {
        console.log("getVehicleUrl")
        return `api/vehicles/${id}`;
    }
    public override updateVehicleUrl(id: number): string {
        console.log("updateVehicleUrl")
        return `api/vehicles/${id}`;
    }
    public override deleteVehicleUrl(id: number): string {
        console.log("deleteVehicleUrl")
        return `api/vehicles/${id}`;
    }

    public override mapVehicle(vehicle: any): Vehicle {
        console.log(vehicle)
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
    public mapProviders(data: PaginatedData<any>): PaginatedData<Provider> {
        console.log(data)
        const strapi_data: PaginatedData<ProviderItem> = { ...data };
        return {
            data: strapi_data.data.map(provider => {
                return {
                    name: provider.attributes.name,
                    category: provider.attributes.category,
                    phone: provider.attributes.phone
                };
            }),
            pagination: data.pagination
        };
    }


    public mapUser(data: StrapiOwner): User {
        return {
            id: data.id || 0,
            username: "",
            email: "",
            provider: "",
            confirmed: false,
            blocked: false,
            createdAt: "",
            updatedAt: "",
        };
    }
}

