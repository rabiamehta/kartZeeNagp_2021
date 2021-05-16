import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly apiService: ApiService) { }

  categoryUrl = environment.server_url + '/categories';

  allCategories(): Observable<Category[]> {
    return this.apiService.get(this.categoryUrl);
  }
}
