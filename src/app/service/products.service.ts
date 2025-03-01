import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7179/api/products'; // ❗ Proveri da li je backend na ovom URL-u
  products: Product[] = []; // ✅ Lista proizvoda za osvežavanje

  constructor(private http: HttpClient) {}

  // ✅ Dohvatanje svih proizvoda
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`); // ❗ Promenjen endpoint na "/all"
  }

  // ✅ Dodavanje novog proizvoda
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData); // ❗ Osigurano da koristi "/add"
  }

  // ✅ Ažuriranje liste proizvoda
  refreshProducts() {
    this.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('🔄 Products list updated:', this.products);
      },
      error: (error) => {
        console.error('❌ Error refreshing products:', error);
      }
    });
  }
}
