import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientModule]
    })
      .compileComponents();
  });

  function updateForm(userEmail, userPassword): void {
    component.loginForm.controls.email.setValue(userEmail);
    component.loginForm.controls.password.setValue(userPassword);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = fixture.debugElement.injector.get(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('form should be invalid if field is empty', fakeAsync(() => {
    updateForm('' , '');
    expect(component.loginForm.invalid).toBeTruthy();
  }));

  it('form should be invalid with invalid email address', fakeAsync(() => {
    updateForm('abc@gmail.c' , '');
    expect(component.loginForm.invalid).toBeTruthy();
  }));

  it('form should be invalid if not according to password requirements', fakeAsync(() => {
    updateForm('abc@gmail.com' , 'abc');
    expect(component.loginForm.invalid).toBeTruthy();
  }));

  it('testing login functionality', () => {
    updateForm('nagp@gmail.com', '123456');
    const loginSpy = spyOn(loginService, 'validUser').and.returnValue(true);
    const router: Router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.submitLoginForm(component.loginForm.value);
    expect(loginSpy).toHaveBeenCalled();
  });
});
