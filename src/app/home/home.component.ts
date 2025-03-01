import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];  // Svi proizvodi

  // ✅ Carousel opcije
  carouselOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true, // ✅ Automatsko pomeranje
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 } // ✅ 3 proizvoda u jednom redu
    }
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        console.log("📢 Učitani proizvodi:", this.products);
      },
      (error) => {
        console.error('❌ Greška pri učitavanju proizvoda:', error);
      }
    );
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase());
  }
}
