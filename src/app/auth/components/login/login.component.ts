import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading!: boolean;
  loginForm!: FormGroup;
  emailRegex!: RegExp;
  passwordRegex!: RegExp;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.passwordRegex = /.{4,}/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [
        null,
        [Validators.required, Validators.pattern(this.passwordRegex)],
      ],
    });
  }

  onLogin(): void {
    this.isLoading = true;
    this.auth
      .login(this.loginForm.value)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.router.navigateByUrl('');
        })
      )
      .subscribe();
  }
}
