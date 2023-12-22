import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  isLoading!: boolean;
  signupForm!: FormGroup;
  userNameRegex!: RegExp;
  emailRegex!: RegExp;
  passwordRegex!: RegExp;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userNameRegex = /^[a-zA-Z][a-zA-Z0-9_ -]{1,}$/;
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.passwordRegex = /.{4,}/;
    this.signupForm = this.formBuilder.group({
      userName: [
        null,
        [Validators.required, Validators.pattern(this.userNameRegex)],
      ],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [
        null,
        [Validators.required, Validators.pattern(this.passwordRegex)],
      ],
    });
  }

  onSignup(): void {
    this.isLoading = true;
    this.auth
      .signup(this.signupForm.value)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.router.navigateByUrl('/facesnaps');
        })
      )
      .subscribe();
  }
}
