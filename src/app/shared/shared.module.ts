import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectedCardDirective } from './directives/selectable-card.directive';
import { UserItemComponent } from './components/toolbar/user-item/user-item.component';
import { ButtonDirective } from './directives/button-directive.directive';
import { ItemDirective } from './directives/item-directive.directive';

@NgModule({
    declarations: [
        // Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        SelectedCardDirective,
        ButtonDirective,
        ItemDirective,
        // Pipes
    ],
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        //Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        SelectedCardDirective,
        ButtonDirective,
        ItemDirective,
        // Modules
        CommonModule,
        HttpClientModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        //Pipes
    ]
})
export class SharedModule { }
