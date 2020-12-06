import { RemoveUploadedFileComponent } from './../../pages/remove-uploaded-file/remove-uploaded-file.component';
import { UploadFileComponent } from '../../pages/upload-file/upload-file.component';
import { ListOptionsTableComponent } from './../../pages/list-options-table/list-options-table.component';
import { AddTablesComponent } from './../../pages/add-tables/add-tables.component';
import { AuthGaurd } from './../../components/gaurds/authGaurd.gaurd';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CheckTransferEvaluationComponent } from '../../pages/check-transfer-evaluation/check-transfer-evaluation.component';
import { AddNewOptionsComponent } from '../../pages/add-new-options/add-new-options.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd] },
    { path: 'addTables', component: AddTablesComponent, canActivate: [AuthGaurd] },
    { path: 'checktransferevaluation', component: CheckTransferEvaluationComponent, canActivate: [AuthGaurd]},
    { path: 'add-new-options', component: AddNewOptionsComponent, canActivate: [AuthGaurd]},
    { path: 'list-table-options', component: ListOptionsTableComponent, canActivate: [AuthGaurd]},
    {path: 'upload-data', component: UploadFileComponent, canActivate: [AuthGaurd]},
    {path: 'remove-uploaded-data', component: RemoveUploadedFileComponent, canActivate: [AuthGaurd]}
];
