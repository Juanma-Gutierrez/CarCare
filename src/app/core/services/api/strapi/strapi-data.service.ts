import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { Observable, map } from 'rxjs';
import { PaginatedData } from 'src/app/core/interfaces/data';
import { StrapiArrayResponse, StrapiResponse } from './interfaces/strapi-data';

@Injectable({
    providedIn: 'root'
})
export class StrapiDataService extends DataService {

    constructor(protected api: ApiService) {
        super();
    }

    public override query<T>(resource: string, params: any): Observable<PaginatedData<T>> {
        console.log("StrapiDataService.query");
        var res = this.api.get(`/${resource}`, params).pipe(map((response: StrapiArrayResponse<T>) => {
            return {
                data: response.data.map(data => { return { ...(data.attributes), id: data.id }; }),
                pagination: response.meta.pagination!
            };
        }));
        return res;
    }
    public get<T>(resource: string): Observable<T> {
        console.log("StrapiDataService.get");
        return this.api.get(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...(response.data.attributes) };
        }));
    }
    public override post<T>(resource: string, data: any): Observable<T> {
        console.log("StrapiDataService.post")
        return this.api.post(`/${resource}`, { data: data } as Object).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }

    public override put<T>(resource: string, data: any): Observable<T> {
        console.log("StrapiDataService.put")
        return this.api.put(`/${resource}`, { data: data }).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }
    public override delete<T>(resource: string): Observable<T> {
        console.log("StrapiDataService.delete")
        return this.api.delete(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }
}



