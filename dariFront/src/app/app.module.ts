import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import form field module
import { MatSelectModule } from '@angular/material/select'; // Import select module
import { MatOptionModule } from '@angular/material/core'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { DeviceComponent } from './components/devices/devices.component';  // Import HomeComponent
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
//import { RoomSelectingDialogComponent } from './components/room-selecting-dialog/room-selecting-dialog.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homes/:userId/rooms', component: HomeComponent },
  { path: 'homes/:userId/rooms/:roomId/devices', component: RoomComponent },
  { path: 'users/:userId/devices/connected', component: DeviceComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    RegisterComponent, 
    IndexComponent, 
    HomeComponent, 
    RoomComponent, 
    DeviceComponent,
    //RoomSelectingDialogComponent
    //DevicesComponent, RoomSelectingDialogComponent,
     // Add HomeComponent here
  ],
  imports: [

    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatDialogModule, 
    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
