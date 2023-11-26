import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { AuthStrapiService } from 'src/app/core/services/api/strapi/auth-strapi.service';
import { StrapiDataService } from 'src/app/core/services/api/strapi/strapi-data.service';


@NgModule({
    imports: [
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        VehicleItemComponent,
        VehicleDetailComponent,
        SpentItemComponent
    ],
    providers:[
        AuthStrapiService,
    ]
})
export class HomePageModule { }
