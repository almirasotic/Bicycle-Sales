export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;  // ✅ URL slike (za prikaz nakon uploada)
  imageFile?: File;   // ✅ Lokalno skladištenje fajla (pre slanja)
}
