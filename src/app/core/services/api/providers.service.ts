import { Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedProviders } from './strapi/interfaces/strapi-providers';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';

interface CrudProviders {
    getAll(ownerId: number): Observable<PaginatedProviders>;
    addProvider(vehicle: Provider): Observable<Provider>;
    updateProvider(vehicle: Provider): Observable<Provider>;
    deleteProvider(vehicle: Provider): Observable<Provider>;
}
@Injectable({
    providedIn: 'root'
})
export class ProvidersService {
    private _providers: BehaviorSubject<PaginatedProviders> = new BehaviorSubject<PaginatedProviders>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public providers$: Observable<PaginatedProviders> = this._providers.asObservable();

    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    public getAll(userId: number): Observable<PaginatedProviders> {
        console.log("getAll Provider:", userId)
        // Filtra los proveedores del propietario registrado
        const apiUrl = "api/providers?populate=users_permissions_user&filters[users_permissions_user][id]=" + userId;
        console.log("API URL:", apiUrl);
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(tap(response => {
            console.log("Proveedores: ")
            console.table(response.data)
        }))
        return obs;
    }
}
