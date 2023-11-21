import { ApiService } from './core/services/api/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/api/auth.service';
import { AuthStrapiService } from './core/services/api/strapi/auth-strapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientProvider as HttpClientService } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';
import { SharedModule } from './shared/shared.module';
import { JwtService } from './core/services/jwt.service';

export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
    jwt: JwtService,
    api: ApiService
) {
    return new AuthStrapiService(jwt, api);
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
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
