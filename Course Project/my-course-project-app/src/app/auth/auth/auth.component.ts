import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogInMode: boolean = true;
  isLoading: boolean = false;
  errorMsg: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return
    }

    const email = form.value.email
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>

    if (this.isLogInMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
    }, errorMsg => {
      console.log(errorMsg)
      this.errorMsg = errorMsg
      this.isLoading = false;
    })
    form.reset();
  }
}
