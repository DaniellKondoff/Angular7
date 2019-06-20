import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogInMode: boolean = true;
  isLoading: boolean = false;
  errorMsg: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  private alertSubs: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
      this.router.navigate(['/recipes'])
    }, errorMsg => {
      console.log(errorMsg)
      this.errorMsg = errorMsg
      this.showErrorAlert(errorMsg);
      this.isLoading = false;
    })
    form.reset();
  }

  onHandleError(){
    this.errorMsg = null
  }

  private showErrorAlert(errorMsg: string){
    const alertComponentFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alerComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    alerComponentRef.instance.message = errorMsg;

    this.alertSubs = alerComponentRef.instance.close.subscribe(() => {
      this.alertSubs.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.alertSubs){
      this.alertSubs.unsubscribe()
    }
  }
}
