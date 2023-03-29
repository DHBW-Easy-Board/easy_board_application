import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
