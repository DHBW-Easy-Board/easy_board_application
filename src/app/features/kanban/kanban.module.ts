import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KanbanRoutingModule } from './kanban-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ArchiveComponent } from './pages/archive/archive.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardImageComponent } from './components/board-image/board-image.component';
import { BoardDeleteComponent } from './components/board-delete/board-delete.component';
import { BoardEditComponent } from './components/board-edit/board-edit.component';
import { CardComponent } from './components/card/card.component';
import { ColumnComponent } from './components/column/column.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { SaveBoardComponent } from 'src/app/shared/components/save-board/save-board.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { UserIconComponent } from 'src/app/shared/components/user-icon/user-icon.component';
import { UserRoleListComponent } from './components/user-role-list/user-role-list.component';
import { ViewCardComponent } from './components/view-card/view-card.component';

// Material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ArchiveComponent,
    BoardComponent,
    BoardDeleteComponent,
    BoardEditComponent,
    BoardImageComponent,
    CardComponent,
    ColumnComponent,
    CreateCardComponent,
    DashboardComponent,
    DashboardItemComponent,
    DeleteCardComponent,
    UploadImageComponent,
    UserRoleListComponent,
    ViewCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    KanbanRoutingModule,
    ReactiveFormsModule,
    ContainerComponent,
    SaveBoardComponent,
    UserIconComponent,
    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
  ]
})
export class KanbanModule { }
