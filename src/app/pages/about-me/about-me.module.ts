import { AboutMePage } from './about-me.page';
import { AboutMePageRoutingModule } from './about-me-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        AboutMePageRoutingModule
    ],
    declarations: [
        AboutMePage
    ]
})
export class AboutMePageModule { }
