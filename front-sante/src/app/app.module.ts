import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';


import { CategoriesComponent } from './categories/categories.component';

import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { WeightComponent } from './weight/weight.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { WaterReminderComponent } from './water-reminder/water-reminder.component';
import { PressureComponent } from './pressure/pressure.component';
import { WaterIntakeHistoryComponent } from './water-intake-history/water-intake-history.component';
import { ActivityService } from './activity.service';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,

    CategoriesComponent,
   
    PressureComponent,
    WaterReminderComponent,
    ActivityComponent,
    LifestyleComponent,
    WeightComponent,
    ProfileComponent,
    TestComponent,
    ArticleDetailComponent,
    HomeComponent,
    WaterIntakeHistoryComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [AuthService,ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
