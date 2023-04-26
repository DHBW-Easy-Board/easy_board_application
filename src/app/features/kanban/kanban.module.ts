import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KanbanRoutingModule } from './kanban-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { BoardComponent } from './pages/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    CreateCardComponent,
    DashboardComponent,
    DashboardItemComponent,
    DeleteCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    KanbanRoutingModule,
    ContainerComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
  ]
})
export class KanbanModule { }
