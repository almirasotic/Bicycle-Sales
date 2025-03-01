import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password, // ✅ Sigurno koristimo ispravno ime
      role: 0,
    };

    console.log('📤 Šaljem podatke:', user); // ✅ Debug

    this.authService.register(user).subscribe(
      (response) => {
        console.log('✔ Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('❌ Registration failed', error);
        alert(
          'Registration failed: ' +
            (error.error?.message || JSON.stringify(error))
        );
      }
    );
  }
}
