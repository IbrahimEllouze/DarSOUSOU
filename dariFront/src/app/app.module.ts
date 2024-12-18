import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { DeviceComponent } from './components/devices/devices.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homes/:userId/rooms', component: HomeComponent },
  { path: 'homes/:userId/rooms/:roomId/devices', component: RoomComponent },
  { path: 'users/:userId/devices/connected', component: DeviceComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'users/:userId/dashboard', component: DashboardComponent },
  { path: 'users/:userId/store', component: StoreComponent },

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
    DashboardComponent, 
    StoreComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule, 
    MatSnackBarModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
