import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {

  }

  signIn() {
    this.authService.login(this.email, this.password)
      .subscribe(
        () => this.router.navigate(['gallery']),
        (err) => this.errorMsg = err
      )
  }

}
