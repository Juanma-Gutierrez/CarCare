import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        // Directives
        // Components
        // Pipes
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        //Components
        // Directives
        // Modules
        CommonModule,
        IonicModule,
        FormsModule,
        //Pipes
    ]
})
export class SharedModule { }
