import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { RestaurantCardComponent } from './components/cards/restaurant-card/restaurant-card.component';
import { RestaurantMenuComponent } from './pages/browsing/restaurant-menu/restaurant-menu.component';
import { MenuItemCardComponent } from './components/cards/menu-item-card/menu-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    RestaurantsComponent,
    UserHomeComponent,
    RestaurantCardComponent,
    RestaurantMenuComponent,
    MenuItemCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
