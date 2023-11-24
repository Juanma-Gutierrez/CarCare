import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    private _user:User|undefined
    @Input('user') set user(_user:User|undefined){
        this._user = _user;
      }

    constructor(
        private popoverController: PopoverController
    ) { }
    logoutClick(event: Event) {
        console.log("logoutClick")
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
