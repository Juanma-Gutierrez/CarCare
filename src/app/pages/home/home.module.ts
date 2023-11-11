import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleComponent } from './vehicle/vehicle.component';


@NgModule({
    imports: [
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [HomePage, VehicleComponent]
})
export class HomePageModule { }
