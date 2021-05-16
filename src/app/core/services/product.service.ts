import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productUrl = environment.server_url + '/products/';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  allProduct(): Observable<Product[]> {
    return this.apiService.get(this.productUrl);
  }

  getProductById(id: string): Observable<Product>{
    return this.apiService.get(this.productUrl + id);
  }

  updateProduct(product): Observable<Product>{
    return this.apiService.put(this.productUrl + '/' + product.id, product);
  }
}
