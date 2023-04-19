import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BoardComponent } from './pages/board/board.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserRoleTestpageComponent } from './pages/user-role-testpage/user-role-testpage.component';

const routes: Routes = [
    { path: 'boards/:id', component: BoardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'testpage', component: UserRoleTestpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
