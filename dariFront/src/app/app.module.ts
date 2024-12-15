import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
//import { RoomComponent } from './components/room/room.component';  // Import HomeComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homes/:userId/rooms', component: HomeComponent },// Ensure HomeComponent route is added
  { path: '', redirectTo: '/index', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    RegisterComponent, 
    IndexComponent, 
    HomeComponent, 
    //RoomComponent  // Add HomeComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
