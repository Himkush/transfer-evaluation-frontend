import { AuthGaurd } from './../../components/gaurds/authGaurd.gaurd';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd] }
    { path: 'dashboard', component: DashboardComponent }
];
