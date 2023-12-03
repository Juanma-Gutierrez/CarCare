import { Injectable } from '@angular/core';
import { PaginatedData } from '../../interfaces/data';
import { Vehicle } from '../../interfaces/Vehicle';

@Injectable({
    providedIn: 'root'
})
export abstract class MappingService {


    public abstract queryVehiclesUrl(): string;

    public abstract getVehicleUrl(id: number): string;

    public abstract updateVehicleUrl(id: number): string;

    public abstract deleteVehicleUrl(id: number): string;

    public abstract mapVehicle(data: any): Vehicle;

    public abstract mapVehicles(data: PaginatedData<any>): PaginatedData<Vehicle>
}
