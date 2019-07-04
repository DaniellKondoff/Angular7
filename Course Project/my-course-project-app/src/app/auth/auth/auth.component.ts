import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/actions/auth.action'

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
  private storeSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
   this.storeSubs =  this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.errorMsg = authState.authError
      if(this.errorMsg) {
        this.showErrorAlert(this.errorMsg)
      }
    });
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

    if (this.isLogInMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email:email, password:password}))
    }

    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError(null))
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
    this.storeSubs.unsubscribe()
  }
}
