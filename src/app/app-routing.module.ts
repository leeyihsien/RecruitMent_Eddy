import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {TrinavComponent } from './trinav/trinav.component';

const routes: Routes = [{path:'users',component:UsersComponent},
{path:'trinav',component:TrinavComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
