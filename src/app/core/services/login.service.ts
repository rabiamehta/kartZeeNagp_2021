import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userUrl = environment.server_url + '/users';
  users: User[];
  constructor(private apiService: ApiService) {
    this.getUsers();
   }

    // get data of users
    getUsers(): void{
      this.apiService.get(this.userUrl).subscribe(data => {
        this.users = data;
      });
    }

    // Validate User
    validUser(userForm: User): boolean{
      let valid = false;
      this.users.forEach(user =>  {
        if (user.email === userForm.email && user.password === userForm.password){
          sessionStorage.setItem('user', JSON.stringify(user));
          valid = true;
        }
      });
      return valid;
    }
}
