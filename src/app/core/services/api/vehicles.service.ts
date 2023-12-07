import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedVehicles, Vehicle, VehicleCategory } from '../../interfaces/Vehicle';
import { MappingService } from './mapping.service';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

interface CrudVehicles {
    getAll(ownerId: number): Observable<PaginatedVehicles>;
    addVehicle(vehicle: Vehicle): Observable<Vehicle>;
    updateVehicle(vehicle: Vehicle): Observable<Vehicle>;
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle>;
}

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements CrudVehicles {
    private _vehicles: BehaviorSubject<PaginatedVehicles> = new BehaviorSubject<PaginatedVehicles>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public vehicles$: Observable<PaginatedVehicles> = this._vehicles.asObservable();

    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    public query(q: string): Observable<PaginatedVehicles> {
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(`${environment.BASE_URL}/api/vehicles`, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)));
        return obs
    }

    public getAll(userId: number): Observable<PaginatedVehicles> {
        // Filtra los vehículos del propietario registrado
        const apiUrl = "api/vehicles?populate=users_permissions_user&filters[users_permissions_user]=" + userId;
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)), tap(vehicles => {
            this._vehicles.next(vehicles);
        }));
        return obs;
    }

    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        const endPoint = "api/vehicles";
        var _vehicle: any = {
            plate: vehicle.plate,
            brand: vehicle.brand,
            model: vehicle.model,
            registrationDate: vehicle.registrationDate,
            category: vehicle.category,
            available: vehicle.available,
            users_permissions_user: vehicle.owner
        }
        return this.dataSvc.post<Vehicle>(endPoint, _vehicle);
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.dataSvc.put<any>(this.mapping.updateVehicleUrl(vehicle.id!), vehicle).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }

    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.dataSvc.delete<any>(this.mapping.deleteVehicleUrl(vehicle.id!)).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }
}
