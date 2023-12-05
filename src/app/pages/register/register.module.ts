import { NgModule } from '@angular/core';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
    imports: [
        SharedModule,
        RegisterPageRoutingModule,
    ],
    declarations: [
        RegisterPage,
        RegisterFormComponent,
    ]
})
export class RegisterPageModule { }
