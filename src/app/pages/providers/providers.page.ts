import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { InternalUIService } from 'src/app/core/services/internalUI.service';
import { ProvidersFormComponent } from './providers-form/providers-form.component';
import { StrapiProvider } from 'src/app/core/services/api/strapi/interfaces/strapi-providers';
import { Provider } from 'src/app/core/interfaces/provider';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.page.html',
    styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
    public user: User | null = null;

    constructor(
        private apiSvc: ApiService,
        public providersSvc: ProvidersService,
        private uiSvc: InternalUIService,
        private modal: ModalController,
    ) { }

    ngOnInit() {
        this.user = this.apiSvc.getUser();
        this.apiSvc.user$.subscribe(user => {
            if (user?.id)
                this.getProviders(user.id);
        })
    }

    async getProviders(userId: number) {
        this.providersSvc.getAll(userId).subscribe();
    }

    onEditProviderClicked(provider: Provider) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.providersSvc.updateProvider(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Proveedor actualizado", "tertiary", "bottom")
                        this.reloadProviders(this.user);
                    })
                }
                    break;
                case 'delete': {
                    this.providersSvc.deleteProvider(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Proveedor eliminado", "tertiary", "bottom")
                        this.reloadProviders(this.user);
                    })
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        var newProvider: StrapiProvider = {
            name: provider.name,
            phone: provider.phone,
            category: provider.category
        }
        this.presentForm(provider, onDismiss);
    }

    onNewProvider() {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.providersSvc.addProvider(info.data).subscribe(async provider => {
                        this.uiSvc.showToast("Proveedor creado correctamente", "tertiary", "bottom")
                        this.reloadProviders(this.user);
                    })
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentForm(null, onDismiss);
    }
    async presentForm(data: Provider | null, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: ProvidersFormComponent,
            componentProps: {
                provider: data
            },
            cssClass: "modal-w50"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }

    reloadProviders(user: User | null) {
        if (user?.id)
            this.providersSvc.getAll(user.id).subscribe();
    }
}




