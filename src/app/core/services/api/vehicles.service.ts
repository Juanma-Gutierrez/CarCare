import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';

interface CrudVehicles {
    getAll(): Observable<Vehicle[]>;
    getVehicle(id: number): Observable<Vehicle>;
    addVehicle(concert: Vehicle): Observable<Vehicle>;
    updateVehicle(concert: Vehicle): Observable<Vehicle>;
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle>;
}

@Injectable({
    providedIn: 'root'
})
export class VehiclesService implements CrudVehicles {
    private _vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
    public vehicle$: Observable<Vehicle[]> = this._vehicles.asObservable();

    constructor(
        /* private http: HttpClient */
        private dataService: DataService,
        private mapping: MappingService
    ) { }

    public getAll(): Observable<Vehicle[]> {
        /* return this.http.get<Vehicle[]>(`${environment.BASE_URL}/vehicles`).pipe(tap(res => {
            console.log(this._vehicles.value.toString);
            this._vehicles.next(res);
        })); */
        return new Observable<Vehicle[]>
    }
    getVehicle(id: number): Observable<Vehicle> {
        throw new Error('Method not implemented.');
    }
    addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        throw new Error('Method not implemented.');
    }
    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
        throw new Error('Method not implemented.');
    }
    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
        console.log("Borra vehículo")
        return this.dataService.delete<any>(this.mapping.deleteVehicleUrl(vehicle.id!)).pipe(map(this.mapping.mapVehicle.bind(this.mapping)));
    }



}
