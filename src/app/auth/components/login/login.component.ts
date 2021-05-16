import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/users';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValid: boolean;
  constructor(private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private titleService: Title, private loginService: LoginService) { }


  ngOnInit(): void {
    this.titleService.setTitle('e-kart Authentication');
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
    });

  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  submitLoginForm(loginForm: User): void {
      this.isValid = this.loginService.validUser(loginForm);
      if (this.isValid) {
        this.router.navigateByUrl('/');
        sessionStorage.setItem('isLoggedIn', 'true');
      } else {
        this.router.navigateByUrl('/auth');
        sessionStorage.setItem('isLoggedIn', 'false');
        this.loginForm.reset();
      }
  }
}
