import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private pLATFORM_ID = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private router = inject(Router);
  step: number = 1;
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{5,}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  verifyEmailSubmit() {
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifyCodeSubmit() {
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetPasswordSubmit() {
    this.authService.setResetPassowrd(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        if (isPlatformBrowser(this.pLATFORM_ID)) {
          localStorage.setItem('token', res.token);
        }

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
