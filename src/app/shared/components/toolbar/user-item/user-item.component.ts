import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/interfaces/User';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    @Input() user: User | null = null

    @Input() languages: string[] = ["es", "en"];
    @Input() languageSelected: string = "es";

    constructor(
        private popoverController: PopoverController,
        public apiSvc: ApiService
    ) { }
    ngOnInit(): void { }

    logoutClick(event: Event) {
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}
