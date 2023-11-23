import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()
    public selectedPage = "home";

    constructor(
        private router: Router,
        private popoverController: PopoverController,
    ) {

    }

    ngOnInit() { }

    navToAbout() {
        this.selectedPage = "aboutMe"
        console.log(this?.selectedPage)
        this.router.navigate(['/about-me']);
    }

    navToHome() {
        this.selectedPage = "home"
        console.log(this?.selectedPage)
        this.router.navigate(['/home']);
    }

    logoutClick(event: Event) {
        console.log("logoutClick")
        this.popoverController.dismiss();
        this.logoutClicked.emit()
    }
}

