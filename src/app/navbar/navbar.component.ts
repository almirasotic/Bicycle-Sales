import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserData();
      }
    });
  }

  ngOnInit(): void {
    this.updateUserData();
  }

  updateUserData() {
    this.username = this.authService.getUsernameFromToken();
    this.isAdmin = this.authService.isAdmin();
    console.log("🔹 Navbar: Korisnik:", this.username, "Admin:", this.isAdmin); // ✅ Provera
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
