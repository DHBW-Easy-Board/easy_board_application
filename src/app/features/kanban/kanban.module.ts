import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContainerComponent } from 'src/app/shared/components/container/container.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardItemComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    ContainerComponent,
    MatButtonModule,
    MatCardModule,
  ]
})
export class KanbanModule { }
