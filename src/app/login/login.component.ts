import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password // ✅ Mora biti "password", ne "passwordHash"
    };

    console.log("🔹 Šaljem login zahtev:", credentials);

    this.authService.login(credentials).subscribe(response => {
      console.log("✔ Login uspešan:", response);
      this.authService.saveToken(response.token);
      this.router.navigate(['/']);
    }, error => {
      console.error("❌ Login failed", error);
      alert("Login failed: " + JSON.stringify(error.error));
    });
  }


}
