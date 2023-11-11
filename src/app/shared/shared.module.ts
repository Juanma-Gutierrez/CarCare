import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        // Directives
        // Components
        // Pipes
    ],
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        //Components
        // Directives
        // Modules
        CommonModule,
        HttpClientModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
        //Pipes
    ]
})
export class SharedModule { }
