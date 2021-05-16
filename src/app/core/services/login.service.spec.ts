import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { User } from '../models/users';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const users: User[] = [{
    id: 1,
    email: 'nagp@gmail.com',
    password: '123456',
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validateUser function returns true when user data exist in mock db', fakeAsync(() => {
    const validUser: User = {
      id: 1,
      email: 'nagp@gmail.com',
      password: '123456',
    };
    service.users = users;
    tick();
    expect(service.validUser(validUser)).toBeTrue();
    flush();
  }));

  it('validateUser function returns false when user data does not exist in mock db', fakeAsync(() => {
    const inValidUser: User = {
      id: 2,
      email: 'abc@gmail.com',
      password: '12ddd'
    };
    service.users = users;
    tick();
    expect(service.validUser(inValidUser)).toBeFalse();
    flush();
  }));

});
