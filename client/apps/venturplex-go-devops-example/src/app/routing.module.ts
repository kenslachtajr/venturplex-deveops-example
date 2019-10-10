import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
