import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/Vehicle';
import { environment } from 'src/environments/environment';

interface CrudVehicles {
    getAll(): Observable<Vehicle[]>;
    getVehicle(id: number): Observable<Vehicle>;
    addVehicle(concert: Vehicle): Observable<Vehicle>;
    updateVehicle(concert: Vehicle): Observable<Vehicle>;
    deleteVehicle(id: number): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class VehicleService implements CrudVehicles {
    private _vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
    public vehicle$: Observable<Vehicle[]> = this._vehicles.asObservable();

    constructor(
        /* private http: HttpClient */
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
    addVehicle(concert: Vehicle): Observable<Vehicle> {
        throw new Error('Method not implemented.');
    }
    updateVehicle(concert: Vehicle): Observable<Vehicle> {
        throw new Error('Method not implemented.');
    }
    deleteVehicle(id: number): Observable<void> {
        throw new Error('Method not implemented.');
    }



}
