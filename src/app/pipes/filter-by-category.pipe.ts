import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
  name: 'filterByCategory',
  pure: false // ✅ Osigurava da se filter ažurira dinamički
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!products || !category) {
      return [];
    }

    console.log(`🔍 Filtriram proizvode za kategoriju: ${category}`);

    return products.filter(
      product => product.category.trim().toLowerCase() === category.trim().toLowerCase()
    );
  }
}
