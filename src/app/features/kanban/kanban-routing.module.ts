import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ArchiveComponent } from './pages/archive/archive.component';
import { BoardComponent } from './pages/board/board.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

const routes: Routes = [
    { path: 'boards/:id', component: BoardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'archive', component: ArchiveComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
