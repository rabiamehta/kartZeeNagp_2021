import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductsResolver } from './resolvers/products.resolver';
import { CheckoutGuard } from './guards/checkout.guard';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: '', component: BestSellerComponent, resolve: { productList: ProductsResolver }},
    {path: 'search', component: SearchComponent, resolve: { productList: ProductsResolver }},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: 'shop', component: ProductListComponent, resolve: { productList: ProductsResolver }},
    {path: 'products/:productId', component: ProductDetailComponent, resolve: { product: ProductResolver}},
    {path: 'quick-order', loadChildren: () => import('../cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard]},
    {path: 'checkout', loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [CheckoutGuard]},
     {path: '**', component: PageNotFoundComponent}
  ]},
  {path: '/', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
