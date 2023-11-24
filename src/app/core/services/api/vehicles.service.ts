import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Vehicle, VehicleCategory } from '../../interfaces/vehicle';
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
        this._vehicles.next(this.cargaVehiculos());
        return new Observable<Vehicle[]>
    }

    cargaVehiculos():Vehicle[]{
         // Creación temporal de vehículos, BORRAR
         var vehicles = [
            {
                id: 1, plate: "1122JMG", brand: "Seat", model: "León", registrationDate: new Date("2015-05-09"),
                category: VehicleCategory.car, available: false, owner: "Juanma"
            },
            {
                id: 2, plate: "2233JMG", brand: "Kia", model: "Stonic", registrationDate: new Date("2020-05-09"),
                category: VehicleCategory.car, available: true, owner: "Juanma"
            },
            {
                id: 3, plate: "1234GGG", brand: "Vespa", model: "125", registrationDate: new Date("2015-05-09"),
                category: VehicleCategory.motorcycle, available: true, owner: "Gema"
            },
            {
                id: 4, plate: "9988JGM", brand: "Kawasaki", model: "GPZ 500", registrationDate: new Date("2010-12-29"),
                category: VehicleCategory.motorcycle, available: false, owner: "Juanma"
            },
            {
                id: 5, plate: "8877JGM", brand: "Skoda", model: "Fabia", registrationDate: new Date("2008-08-21"),
                category: VehicleCategory.car, available: true, owner: "Juanma"
            },
            {
                id: 6, plate: "4455GGG", brand: "Volkswagen", model: "Golf", registrationDate: new Date("2014-07-13"),
                category: VehicleCategory.car, available: true, owner: "Gema"
            },
            {
                id: 7, plate: "4421LGG", brand: "Honda", model: "CBR 125", registrationDate: new Date("2013-07-08"),
                category: VehicleCategory.motorcycle, available: false, owner: "Laura"
            }
        ];
        return vehicles
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
