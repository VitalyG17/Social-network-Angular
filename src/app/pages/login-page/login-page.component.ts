import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../data/interfaces/login.interface';
import { AuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private readonly authService: AuthService = inject(AuthService);

  private readonly router: Router = inject(Router);

  public readonly loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  protected onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService
        //@ts-ignore
        .login(this.loginForm.value)
        .subscribe((res) => {
          this.router.navigate(['']);
          console.log(res);
        });
    }
  }
}
