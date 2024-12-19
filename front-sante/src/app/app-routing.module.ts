// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { CategoriesComponent } from './categories/categories.component';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { WeightComponent } from './weight/weight.component';
import { WaterReminderComponent } from './water-reminder/water-reminder.component';
import { TestComponent } from './test/test.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { PressureComponent } from './pressure/pressure.component';
import { ProfileComponent } from './profile/profile.component';
import { WaterIntakeHistoryComponent } from './water-intake-history/water-intake-history.component';
const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
{ path: 'activity', component: ActivityComponent },
 { path: 'home', component: HomeComponent },
 { path: 'profile', component: ProfileComponent },
  { path: 'lifestyle', component: LifestyleComponent },
 {path: 'test',component :TestComponent },
 {path: 'article/:id',component: ArticleDetailComponent } , 
  { path: 'weight', component: WeightComponent }, 
  { path: 'pressure', component: PressureComponent },
  { path: 'water-intake-history/:userId', component: WaterIntakeHistoryComponent },
  { path: 'water-reminder', component: WaterReminderComponent },{ path: 'dashboard',  component: DashboardComponent,  canActivate: [AuthGuard] },{
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
