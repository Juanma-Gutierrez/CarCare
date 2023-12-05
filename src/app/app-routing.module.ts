import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guards';

const routes: Routes = [
    {
        /**
        * AuthGuard utilizado para proteger el acceso a esta ruta.
        * El usuario debe estar autenticado para acceder a la página principal.
        */
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'about-me',
        loadChildren: () => import('./pages/about-me/about-me.module').then(m => m.AboutMePageModule)
    },
    {
        path: 'vehicles',
        loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
    },  {
    path: 'providers',
    loadChildren: () => import('./pages/providers/providers.module').then( m => m.ProvidersPageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
