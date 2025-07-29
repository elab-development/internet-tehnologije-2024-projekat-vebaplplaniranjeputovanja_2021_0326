
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { TripPlansComponent } from './pages/trip-plans/trip-plans.component';
import {AttractionsComponent} from './pages/attractions/attractions.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'trip-plans', component: TripPlansComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


