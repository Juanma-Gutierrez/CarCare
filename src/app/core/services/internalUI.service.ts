import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class InternalUIService {
    constructor(
        private toast: ToastController
    ) { }
    async showToast(messageToShow: string, color: string, position: "top" | "bottom") {
        if (messageToShow != null) {
            const options: ToastOptions = {
                message: messageToShow,
                duration: 1000,
                position: position,
                color: color,
            };
            const toast = await this.toast.create(options);
            toast.present();
        }
    }
}
