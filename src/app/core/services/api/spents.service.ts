import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
        return obs;

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

}
