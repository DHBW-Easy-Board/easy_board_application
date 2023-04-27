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
        path: 'user',
        loadChildren: () => import('./features/user/user.module')
            .then(m => m.UserModule),
        canActivateChild: [authGuard]
    },
    {
        path: 'app',
        loadChildren: () => import('./features/kanban/kanban.module')
            .then(m => m.KanbanModule),
        canActivateChild: [authGuard]
    }
];

// ToDo - Current Hack onSameUrlNavigation
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
