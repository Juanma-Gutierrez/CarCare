import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { Spent } from '../../interfaces/Spent';
import { PaginatedSpents } from './strapi/interfaces/strapi-spents';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';

interface CrudSpents {
    getAll(ownerId: number): Observable<PaginatedSpents>;
    addSpent(spent: Spent): Observable<Spent>;
    updateSpent(spent: Spent): Observable<Spent>;
    deleteSpent(spent: Spent): Observable<Spent>;
}

@Injectable({
    providedIn: 'root'
})
export class SpentsService implements CrudSpents {
    private _spents: BehaviorSubject<PaginatedSpents> = new BehaviorSubject<PaginatedSpents>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public spents$: Observable<PaginatedSpents> = this._spents.asObservable();

    private _totalSpentsAmount = new BehaviorSubject<number>(0);
    totalSpentsAmount$: Observable<number> = this._totalSpentsAmount.asObservable();

    private _totalSpentsNumber = new BehaviorSubject<number>(0);
    totalSpentsNumber$: Observable<number> = this._totalSpentsNumber.asObservable();


    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    getAll(vehicleId: number): Observable<PaginatedSpents> {
        // Filtra los gastos del vehículo registrado
        const apiUrl = "api/spents?populate=*&filters[vehicle][id]=" + vehicleId;
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(tap(response => {
            this._spents.next(response)
        }))
        //this.calculateTotalSpents();
        //this.calculateNumberOfSpents();
        return obs;
    }

    calculateTotalSpents() {
        this.spents$.pipe(
            take(1),
            tap(spents => {
                let totalAmount = 0;
                for (const spent of spents.data) {
                    console.log(spent.amount);
                    totalAmount += spent.amount;
                }
                console.log(totalAmount);
                this._totalSpentsAmount.next(totalAmount);
            })
        ).subscribe();
    }


    calculateNumberOfSpents() {
        this.spents$.pipe(take(1)).subscribe(spents => {
            const numberOfSpents = spents.data.length;
            this._totalSpentsNumber.next(numberOfSpents);
        });
    }


    addSpent(spent: Spent): Observable<Spent> {
        throw new Error('Method not implemented.');
    }

    updateSpent(spent: Spent): Observable<Spent> {
        throw new Error('Method not implemented.');
    }

    deleteSpent(spent: Spent): Observable<Spent> {
        throw new Error('Method not implemented.');
    }

    updateTotalSpentsAmount(amount: number): void {
        this._totalSpentsAmount.next(amount);
    }

    updateTotalSpentsNumber(number: number): void {
        this._totalSpentsNumber.next(number);
    }


}

