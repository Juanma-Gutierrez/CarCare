import { Injectable } from '@angular/core';
import { PaginatedData } from '../../interfaces/data';
import { Vehicle } from '../../interfaces/Vehicle';
import { StrapiProvider } from './strapi/interfaces/strapi-providers';
import { Provider } from '../../interfaces/provider';

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

    public abstract updateProviderUrl(id: number): string;
    public abstract deleteProviderUrl(id: number): string;
    public abstract mapProvider(data: any): Provider;
   //  public abstract mapProviders(data: PaginatedData<any>): PaginatedData<Provider>

}
