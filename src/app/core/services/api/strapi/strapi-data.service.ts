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
        console.log("StrapiDataService.query", resource);
        var res = this.api.get(`/${resource}`, params).pipe(map((response: StrapiArrayResponse<T>) => {
            console.log(response)
            return {
                data: response.data.map(data => { return { ...(data.attributes), id: data.id }; }),
                pagination: response.meta.pagination!
            };
        }));
        console.log(res)
        return res;
    }
    public get<T>(resource: string): Observable<T> {
        console.log("StrapiDataService.get");
        console.log(resource)
        return this.api.get(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...(response.data.attributes) };
        }));
    }
    public override post<T>(resource: string, data: any): Observable<T> {
        console.log("StrapiDataService.post")
        console.log(resource)
        console.table(data)
        console.log(data)
        return this.api.post(`/${resource}`, { data: data } as Object).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }

    public override put<T>(resource: string, data: any): Observable<T> {
        console.log("StrapiDataService.put")
        console.log(resource)
        return this.api.put(`/${resource}`, { data: data }).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }
    public override delete<T>(resource: string): Observable<T> {
        console.log("StrapiDataService.delete")
        console.log(resource)
        return this.api.delete(`/${resource}`).pipe(map((response: StrapiResponse<T>) => {
            return { id: response.data.id, ...response.data.attributes };
        }));
    }
}



