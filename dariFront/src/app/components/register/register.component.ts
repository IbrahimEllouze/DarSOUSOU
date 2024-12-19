import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  homeName: string = '';
  errorMessage: string | null = null;
  showHomeForm: boolean = false; // To toggle between forms
  registeredUserId: number | null = null; // Store user ID after registration

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.registeredUserId = response.id; // Save user ID
        this.showHomeForm = true; // Show home form
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Failed to register. Please try again.';
      }
    });
  }

  createHome() {
    if (this.registeredUserId) {
      const payload = { name: this.homeName };
      this.homeService.createHome(this.registeredUserId, payload).subscribe({
        next: (home) => {
          console.log('Home created successfully', home);
          this.router.navigate([`/homes/${this.registeredUserId}/rooms`]); // Navigate to the dashboard after creating the home
        },
        error: (error) => {
          console.error('Failed to create home', error);
          this.errorMessage = 'Failed to create home. Please try again.';
        },
      });
    }
  }
  
  
}
