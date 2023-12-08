import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpentItemComponent } from './spent-item/spent-item.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { VehicleItemComponent } from './vehicle-item/vehicle-item.component';
import { AuthStrapiService } from 'src/app/core/services/api/strapi/auth-strapi.service';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { ProviderItemComponent } from '../providers/provider-item/provider-item.component';
import { ProviderItemSelectableComponent } from './spent-form/provider-selectable/provider-item-selectable/provider-item-selectable.component';
import { ProviderSelectableComponent } from './spent-form/provider-selectable/provider-selectable.component';


@NgModule({
    imports: [
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        VehicleItemComponent,
        VehicleFormComponent,
        SpentItemComponent,
        SpentFormComponent,
        ProviderSelectableComponent,
        ProviderItemSelectableComponent,
    ],
    providers: [
        AuthStrapiService,
    ]
})
export class HomePageModule { }
