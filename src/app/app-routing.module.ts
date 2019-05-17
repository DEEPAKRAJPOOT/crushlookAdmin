import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { PostmanagementComponent } from './component/postmanagement/postmanagement.component';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: LandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'postmanagement',
    component: PostmanagementComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
