import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { SpentItemComponent } from './spent-item/spent-item.component';


@NgModule({
    imports: [
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        VehicleItemComponent,
        SpentItemComponent
    ]
})
export class HomePageModule { }
