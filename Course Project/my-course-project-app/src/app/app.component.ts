import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as AuthActions from './store/actions/auth.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>){}
  ngOnInit(){
    this.store.dispatch(new AuthActions.AutoLogin(null))
  }
}
