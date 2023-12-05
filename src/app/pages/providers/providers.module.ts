import { NgModule } from '@angular/core';
import { ProvidersPageRoutingModule } from './providers-routing.module';
import { ProvidersPage } from './providers.page';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { ProviderItemComponent } from './provider-item/provider-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ProvidersPageRoutingModule
    ],
    declarations: [
        ProvidersPage,
        ProvidersFormComponent,
        ProviderItemComponent]
})
export class ProvidersPageModule { }
