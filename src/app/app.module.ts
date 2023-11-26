import { ApiService } from './core/services/api/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/api/auth.service';
import { AuthStrapiService } from './core/services/api/strapi/auth-strapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './core/services/api/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider as HttpClientService } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { JwtService } from './core/services/jwt.service';
import { MappingService } from './core/services/api/mapping.service';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { StrapiDataService } from './core/services/api/strapi/strapi-data.service';
import { StrapiMappingService } from './core/services/api/strapi/strapi-mapping.service';

export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}

export function MappingServiceFactory(
    backend: string) {
    switch (backend) {
        case 'Strapi':
            return new StrapiMappingService();
        default:
            throw new Error("Not implemented");

    }
}

export function AuthServiceFactory(
    jwt: JwtService,
    api: ApiService,
) {
    return new AuthStrapiService(jwt, api);
}

export function DataServiceFactory(
    backend: string,
    api: ApiService) {
    switch (backend) {
        case 'Strapi':
            return new StrapiDataService(api);
        default:
            throw new Error("Not implemented");
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        SharedModule
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HttpClientService,
            deps: [HttpClient, Platform],
            useFactory: httpProviderFactory,
        },
        {
            provide: AuthService,
            deps: [JwtService, ApiService],
            useFactory: AuthServiceFactory,
        },
        {
            provide: DataService,
            deps: ['backend', ApiService],
            useFactory: DataServiceFactory,
        },
        {
            provide: MappingService,
            deps: ['backend'],
            useFactory: MappingServiceFactory
        },
        {
            provide: 'backend',
            useValue: 'Strapi'
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
