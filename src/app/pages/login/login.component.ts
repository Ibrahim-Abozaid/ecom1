import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private pLATFORM_ID = inject(PLATFORM_ID);

  isLoading: boolean = false;
  msgError: string = '';
  success: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            setTimeout(() => {
              if (isPlatformBrowser(this.pLATFORM_ID)) {
                localStorage.setItem('token', res.token);
              }

              this.authService.getUserData();
              this.router.navigate(['/home']);
            }, 500);
            this.success = res.message;
            this.msgError = '';
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          // console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
