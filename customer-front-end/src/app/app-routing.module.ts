import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantMenuComponent } from './pages/browsing/restaurant-menu/restaurant-menu.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { OrderConfirmationComponent } from './pages/checkout/order-confirmation/order-confirmation.component';
import { OrderSummaryComponent } from './pages/checkout/order-summary/order-summary.component';
import { PaymentMethodComponent } from './pages/checkout/payment-method/payment-method.component';
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
        children: [
            {
                path: "",
                pathMatch: "full",
                component: RestaurantsComponent
            },
            {
                path: ":restaurantId",
                component: RestaurantMenuComponent
            }
        ]
        
    },
    {
        path: "checkout",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: OrderSummaryComponent
            },
            {
                path: "payment-method",
                component: PaymentMethodComponent
            },
            {
                path: "order-confirmation",
                component: OrderConfirmationComponent
            }
        ]
    },
    {
        path: "user/:userId",
        children: [
            {
                path: "",
                pathMatch: "full",
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
