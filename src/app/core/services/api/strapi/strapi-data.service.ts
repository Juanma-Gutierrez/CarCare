import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { Observable, map } from 'rxjs';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { StrapiResponse } from './interfaces/strapi-data';

@Injectable({
    providedIn: 'root'
})
export class StrapiDataService extends DataService {
    public override query<T>(resource: string, params: any): Observable<PaginatedData<T>> {
        throw new Error('Method not implemented.');
    }
    public get<T>(resource: string): Observable<T> {
        return this.api.get(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...(response.data.attributes) };
        }));
    }
    public override post<T>(resource: string, data: any): Observable<T> {
        throw new Error('Method not implemented.');
    }
    public override put<T>(resource: string, data: any): Observable<T> {
        throw new Error('Method not implemented.');
    }
    public override delete<T>(resource: string): Observable<T> {
        throw new Error('Method not implemented.');
    }

    constructor(protected api: ApiService) {
        super();
    }
}
