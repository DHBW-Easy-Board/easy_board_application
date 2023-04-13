import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Testing
import { TestpageComponent } from './pages/testpage/testpage.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },

    // Testing
    { path: 'testpage', component: TestpageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
