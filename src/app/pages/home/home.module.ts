import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { AuthStrapiService } from 'src/app/core/services/api/strapi/auth-strapi.service';


@NgModule({
    imports: [
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        VehicleItemComponent,
        VehicleFormComponent,
        SpentItemComponent
    ],
    providers: [
        AuthStrapiService,
    ]
})
export class HomePageModule { }
