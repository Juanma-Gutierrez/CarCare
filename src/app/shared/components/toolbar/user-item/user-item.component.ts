import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()

    constructor(
        private popoverController: PopoverController,
        public apiSvc: ApiService
    ) { }
    ngOnInit(): void {
        this.apiSvc.user$.subscribe(c=>{
            console.log(c?.username)
        })
    }

    logoutClick(event: Event) {
        console.log("logoutClick")
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
