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
        throw new Error('Method not implemented.');
    }
    public override mapVehicle(data: any): Vehicle {
        throw new Error('Method not implemented.');
    }

    constructor() {
        super();
    }

    public queryUsersUrl(): string {
        return 'extended-users?populate=picture&sort=id';

    }

    public getUserUrl(id: number): string {
        return `extended-users/${id}/?populate=picture&sort=id`;
    }

    public updateUserUrl(id: number): string {
        return `extended-users/${id}`;
    }

    public deleteUserUrl(id: number): string {
        return `extended-users/${id}`;
    }
    public mapUsers(data: PaginatedData<any>): PaginatedData<User> {
        const strapi_data: PaginatedData<StrapiExtendedUser> = { ...data };
        return {
            data: strapi_data.data.map(user => {
                return {
                    id: user.id || -1,
                    username: user.nickname || "",
                    email: "",
                    provider: "",
                    confirmed: false,
                    blocked: false,
                    createdAt: "",
                    updatedAt: "",
                };
            }),
            pagination: data.pagination
        };
    }
    public mapUser(data: StrapiExtendedUser): User {
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

