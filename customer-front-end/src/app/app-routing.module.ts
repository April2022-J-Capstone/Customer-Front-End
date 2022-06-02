import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "restaurants",
        component: RestaurantsComponent
    },
    {
        path: "user/:userId",
        children: [
            {
                path: "",
                component: UserHomeComponent
            }
        ]
        
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
