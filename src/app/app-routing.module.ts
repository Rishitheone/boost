import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './Auth/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { ActivityComponent } from './pages/activity/activity.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
  {path:'home/user',component:UserComponent,canActivate: [AuthGuard]},
  {path:'home/Activity',component:ActivityComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
