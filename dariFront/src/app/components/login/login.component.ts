import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.user.username && this.user.password) {
      this.authService.login(this.user).subscribe(
        (response) => {
          this.router.navigate([`/homes/${response.id}/rooms`]);
        },
        (error) => {
          this.errorMessage = 'Invalid username or password.';
        }
      );
    }
  }
}