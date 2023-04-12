import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    DashboardComponent,
    TestpageComponent,
    CreateCardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    KanbanRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class KanbanModule { }
