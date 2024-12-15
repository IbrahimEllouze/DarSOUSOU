import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); // Navigate to login after successful registration
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Failed to register. Please try again.';
      }
    });
  }
}