import { Injectable } from '@angular/core';
import { Spent } from '../../interfaces/spent';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

interface CrudSpents {
    getAll(ownerId: number): Observable<PaginatedSpents>;
    addProvider(provider: Spent): Observable<Spent>;
    updateProvider(provider: Spent): Observable<Spent>;
    deleteProvider(provider: Spent): Observable<Spent>;
}

export class SpentsService {

    constructor() { }
}
