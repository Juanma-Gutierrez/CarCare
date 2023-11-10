import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
    imports: [
        SharedModule,
        LoginPageRoutingModule
    ],
    declarations: [
        LoginFormComponent,
        LoginPage]
})
export class LoginPageModule { }
