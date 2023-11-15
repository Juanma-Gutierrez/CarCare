import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    navToAbout() {
        this.selectedPage = "aboutMe"
        console.log(this.selectedPage)
        this.router.navigate(['/about-me']);
    }

    navToHome() {
        this.selectedPage = "home"
        console.log(this.selectedPage)
        this.router.navigate(['/home']);
    }
}

