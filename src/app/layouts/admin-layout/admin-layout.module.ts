import { DeleteOptionsDialogComponent, ListOptionsTableComponent } from './../../pages/list-options-table/list-options-table.component';
import { DeleteDialogComponent } from './../../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddTablesComponent } from '../../pages/add-tables/add-tables.component';
import { AuthGaurd } from './../../components/gaurds/authGaurd.gaurd';
import { DataService } from './../../components/services/data_service.service';
import { CheckTransferEvaluationComponent } from '../../pages/check-transfer-evaluation/check-transfer-evaluation.component';
import { AddNewOptionsComponent } from '../../pages/add-new-options/add-new-options.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { UpdateTableComponent } from '../../pages/update-table/update-table.component';
import { UploadFileComponent } from 'src/app/pages/upload-file/upload-file.component';
import { RemoveUploadedFileComponent } from '../../pages/remove-uploaded-file/remove-uploaded-file.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule
  ],
  declarations: [
    DashboardComponent,
    AddTablesComponent,
    CheckTransferEvaluationComponent,
    DeleteDialogComponent,
    AddNewOptionsComponent,
    DeleteOptionsDialogComponent,
    ListOptionsTableComponent,
    UpdateTableComponent,
    UploadFileComponent,
    RemoveUploadedFileComponent
  ],
  providers: [DataService],
  entryComponents: []
})

export class AdminLayoutModule {}
