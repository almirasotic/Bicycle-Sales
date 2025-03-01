import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: null
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  // ✅ Kada korisnik izabere fajl
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      // ✅ Proveravamo da li je fajl slika (jpg, jpeg, png)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, JPEG, PNG)!');
        return;
      }

      this.selectedFile = file;

      // ✅ Prikaz slike pre slanja
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
    }
  }

  // ✅ Kada korisnik klikne na "Add Product"
  onSubmit() {
    // ✅ Proveravamo da li su sva polja popunjena
    if (!this.product.name || !this.product.price || !this.product.category || !this.product.description) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.product.price <= 0) {
      alert('Price must be greater than 0!');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);

    if (this.selectedFile !== null) {
      formData.append('image', this.selectedFile);
    }

    this.productService.addProduct(formData).subscribe(response => {
      console.log('✔ Product added:', response);
      alert('Product successfully added!');

      // ✅ Osvežavanje liste proizvoda na HomePage-u
      this.productService.refreshProducts();

      this.resetForm();
      this.router.navigate(['/']); // ✅ Automatski preusmeri korisnika na HomePage
    }, error => {
      console.error('❌ Error adding product:', error);
    });
  }

  // ✅ Resetovanje forme nakon uspešnog dodavanja proizvoda
  resetForm() {
    this.product = {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: null
    };
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
