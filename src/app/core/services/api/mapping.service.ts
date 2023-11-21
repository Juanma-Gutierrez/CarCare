import { Injectable } from '@angular/core';
import { PaginatedData } from '../../interfaces/data';
import { Vehicle } from '../../interfaces/vehicle';

@Injectable({
    providedIn: 'root'
})
export abstract class MappingService {


    public abstract queryVehiclesUrl(): string;

    public abstract getVehicleUrl(id: number): string;

    public abstract updateVehicleUrl(id: number): string;

    public abstract deleteVehicleUrl(id: number): string;

    public abstract mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle>;

    public abstract mapVehicle(data: any): Vehicle;
}
