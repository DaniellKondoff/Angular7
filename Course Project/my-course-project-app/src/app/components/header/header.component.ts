import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/actions/auth.action'
import * as RecipesActions from '../../store/actions/recipe.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private isAuth = false;
  private userSubs: Subscription

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs =  this.store.select('auth').subscribe(userState => {
    this.isAuth = !!userState.user
    console.log(!userState)
    console.log(!!userState.user)
   });
  }

  onSaveData(){
    this.store.dispatch(new RecipesActions.StoreRecipes(null))
  }

  onFetchData(){
    this.store.dispatch(new RecipesActions.FetchRecipes(null))
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout(null))
  }
}
