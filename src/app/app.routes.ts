import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./component/tarjeta-list/tarjeta-list.component')
    }
];
