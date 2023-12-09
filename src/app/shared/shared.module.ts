import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectedCardDirective } from './directives/selectable-card.directive';
import { UserItemComponent } from './components/toolbar/user-item/user-item.component';
import { ButtonDirective } from './directives/button-directive.directive';
import { ItemDirective } from './directives/item-directive.directive';
import { UpperCamelCasePipe } from './pipes/upper-camel-case.pipe';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/services/custom-translate.service';

@NgModule({
    declarations: [
        // Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        SelectedCardDirective,
        ButtonDirective,
        ItemDirective,
        UpperCamelCasePipe,
        // Pipes
        UpperCamelCasePipe,
        NumberFormatPipe,
    ],
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forChild({
            loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
            }
            }),
    ],
    exports: [
        //Components
        ToolbarComponent,
        UserItemComponent,
        // Directives
        ButtonDirective,
        ItemDirective,
        SelectedCardDirective,
        // Modules
        CommonModule,
        TranslateModule,
        HttpClientModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        //Pipes
        NumberFormatPipe,
        UpperCamelCasePipe,
    ]
})
export class SharedModule { }
