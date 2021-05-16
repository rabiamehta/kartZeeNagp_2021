import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  public stateUrl = environment.server_url + '/states';
  constructor(private readonly apiService: ApiService) { }

  fetchAllStates(): Observable<any>{
    return this.apiService.get(this.stateUrl);
  }

}
