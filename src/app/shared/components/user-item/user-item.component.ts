import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
    private _user: User | undefined

    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    @Input('user') set user(_user: User | undefined) {
        this._user = _user;
    }
    get() {
        return this._user
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
