import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APP_ROUTES_ENUM } from '../app.routes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthCredentials } from '../_interfaces/auth.interface';
import { Store } from '@ngrx/store';
import { selectLoading } from '../_store/layout/layout.selectors';

@Component({
  selector: 'mindata-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  standalone: true,
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);
  authForm!: FormGroup;

  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  login(): void {
    const formVal: AuthCredentials = this.authForm.value;
    this.authService.login(formVal).subscribe(() => {
      this.router.navigate([APP_ROUTES_ENUM.HOMEPAGE]);
    });
  }
}
