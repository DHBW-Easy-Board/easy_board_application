import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        pathMatch: 'full', 
        redirectTo: 'auth/sign-in'
    },
    {
        path: 'auth', 
        loadChildren: () => import('./features/auth/auth.module')
            .then(m => m.AuthModule)
    },
    {
        path: 'kanban',
        loadChildren: () => import('./features/kanban/kanban.module')
            .then(m => m.KanbanModule),
        canActivate: [authGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
