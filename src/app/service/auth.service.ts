import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7179/api/auth'; // ❗ Prebaci na HTTP ako backend ne podržava HTTPS

  constructor(private http: HttpClient) {}

  // ✅ Metod za registraciju korisnika
  register(user: any): Observable<any> {
    console.log('📤 Šaljem zahtev sa:', user); // Debug

    return this.http.post(`${this.apiUrl}/register`, {
      username: user.username,
      email: user.email,
      password: user.password, // ✅ Backend očekuje "password", ne "passwordHash"
      role: user.role || 0,
    });
  }


  // ✅ Metod za login korisnika
  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(
      `${this.apiUrl}/login`,
      {
        email: credentials.email,
        password: credentials.password, // ✅ Backend očekuje "password"
      },
      { headers }
    );
  }

  // ✅ Čuvanje tokena u LocalStorage
  saveToken(token: string) {
    console.log('🔹 Čuvam token:', token);
    localStorage.setItem('token', token);
  }

  // ✅ Dohvatanje tokena iz LocalStorage-a
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Brisanje tokena prilikom odjave
  logout() {
    localStorage.removeItem('token');
  }

  // ✅ Dohvatanje korisničkog imena iz tokena
  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('🔹 Dekodiran token:', decodedToken);

        return (
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ] ||
          decodedToken['name'] ||
          decodedToken['username'] ||
          null
        );
      } catch (error) {
        console.error('❌ Greška pri dekodiranju tokena:', error);
        return null;
      }
    }
    return null;
  }

  // ✅ Dohvatanje korisničke role iz tokena
  getUserRole(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("🔹 Dekodiran token:", decodedToken); // ✅ Provera

        return parseInt(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken["role"], 10) || 0;
      } catch (error) {
        return null;
      }
    }
    return null;
  }



  // ✅ Proveravamo da li je korisnik admin (rola = 1)
  isAdmin(): boolean {
    return this.getUserRole() === 1;
  }

  // ✅ Proveravamo da li je korisnik ulogovan
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
