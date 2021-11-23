import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { confirmedValidator } from './password-confirmed.validator';
import { strengthPassword } from './password-strength.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        strengthPassword(),
      ]),
      current_password: new FormControl('', [
        Validators.required,
        confirmedValidator(),
      ]),
      roles: new FormControl(['USUARIO'], [Validators.required]),
    });
  }

  register() {
    this.authService.register(this.form.value).subscribe((data) => {
      this.router.navigate(['./auth/login']);
    });
  }

  get nameNoValido() {
    return (
      this.form.get('name')?.errors?.['required'] &&
      this.form.get('name')?.touched
    );
  }

  get lastNameNoValido() {
    return (
      this.form.get('last_name')?.errors?.['required'] &&
      this.form.get('last_name')?.touched
    );
  }

  get emailNoValido() {
    return (
      this.form.get('email')?.errors?.['required'] &&
      this.form.get('email')?.touched
    );
  }

  get emailInvalid() {
    return (
      this.form.get('email')?.errors?.['email'] &&
      this.form.get('email')?.touched
    );
  }

  get passwordNoValido() {
    return (
      this.form.get('password')?.errors?.['required'] &&
      this.form.get('password')?.touched
    );
  }

  get passwordInvalidLength() {
    return (
      this.form.get('password')?.errors?.['minlength'] &&
      this.form.get('password')?.touched
    );
  }

  get passwordInvalidStrength() {
    return (
      this.form.get('password')?.errors?.['strength'] &&
      this.form.get('password')?.touched &&
      this.form.get('password')?.value.length > 8
    );
  }

  get currentPasswordNoValido() {
    return (
      this.form.get('current_password')?.errors?.['required'] &&
      this.form.get('current_password')?.touched
    );
  }

  get currentPasswordInvalid() {
    return (
      this.form.get('current_password')?.errors?.['notSame'] &&
      this.form.get('current_password')?.touched
    );
  }
}
