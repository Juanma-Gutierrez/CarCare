import { ApiService } from './core/services/api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/auth.service';
import { AuthStrapiService } from './core/services/auth-strapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientProvider } from './core/services/http-client.provider';
import { HttpClientWebProvider } from './core/services/http-client-web.provider';

export function httpProviderFactory(
    http: HttpClient) {
    return new HttpClientWebProvider(http);
}

export function AuthServiceProvider(
    api: ApiService
) {
    return new AuthStrapiService(api);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        IonicModule.forRoot(),
        HttpClientModule
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HttpClientProvider,
            deps: [HttpClient, Platform],
            useFactory: httpProviderFactory,
        },
        {
            provide: AuthService,
            deps: [/* JwtService, */ ApiService],
            useFactory: AuthServiceProvider,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
