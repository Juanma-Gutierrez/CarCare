import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';


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
    ]
})
export class HomePageModule { }
