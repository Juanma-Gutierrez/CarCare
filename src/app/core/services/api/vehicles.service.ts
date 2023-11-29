import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedVehicles, Vehicle, VehicleCategory } from '../../interfaces/Vehicle';
import { MappingService } from './mapping.service';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { ApiService } from './api.service';

interface CrudVehicles {
    getAll(ownerId: number): Observable<PaginatedVehicles>;
    getVehicle(id: number): Observable<Vehicle>;
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
        private apiSvc: ApiService,
    ) { }

    public query(q: string): Observable<PaginatedVehicles> {
        console.log("query")
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(`${environment.BASE_URL}/api/vehicles`, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)));
        console.log("obs");
        return obs
    }

    public getAll(ownerId: number): Observable<PaginatedVehicles> {
        console.log("getAll ownerId:", ownerId)
        const apiUrl = "api/vehicles?populate=owner&filters[owner][id]="+ownerId;
        console.log("API URL:", apiUrl);
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(map(this.mapping.mapVehicles.bind(this.mapping)), tap(vehicles => {
            this._vehicles.next(vehicles);
        }));
        console.log(obs);
        return obs;
    }


    getVehicle(id: number): Observable<Vehicle> {
        console.log("getVehicle");
        throw new Error('Method not implemented.');
    }
    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        console.log("addVehicle")
        throw new Error('Method not implemented.');
    }
    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        console.log("updateVehicle")
        throw new Error('Method not implemented.');
    }
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
        console.log("deleteVehicle")
        return this.dataSvc.delete<any>(this.mapping.deleteVehicleUrl(vehicle.id!)).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }


    //    public getAll(): Observable<Vehicle[]> {
    /* return this.http.get<Vehicle[]>(`${environment.BASE_URL}/vehicles`).pipe(tap(res => {
        console.log(this._vehicles.value.toString);
        this._vehicles.next(res);
    })); */
    //        this._vehicles.next(this.cargaVehiculos());
    //        return new Observable<Vehicle[]>
    //      }


}
