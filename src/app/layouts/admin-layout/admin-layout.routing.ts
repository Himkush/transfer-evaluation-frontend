import { ListOptionsTableComponent } from './../../pages/list-options-table/list-options-table.component';
import { AddTablesComponent } from './../../pages/add-tables/add-tables.component';
import { AuthGaurd } from './../../components/gaurds/authGaurd.gaurd';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CheckTransferEvaluationComponent } from '../../pages/check-transfer-evaluation/check-transfer-evaluation.component';
import { AddNewOptionsComponent } from '../../pages/add-new-options/add-new-options.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd] }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addTables', component: AddTablesComponent },
    { path: 'checktransferevaluation', component: CheckTransferEvaluationComponent},
    { path: 'add-new-options', component: AddNewOptionsComponent},
    { path: 'list-table-options', component: ListOptionsTableComponent}
];
