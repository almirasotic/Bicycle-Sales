import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // ✅ Dodato
  { path: 'add-product', component: AddProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // ✅ Ovo sada radi jer imamo 'home'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
