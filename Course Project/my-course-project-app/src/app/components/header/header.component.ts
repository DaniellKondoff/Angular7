import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private isAuth = false;
  private userSubs: Subscription

  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
   this.userSubs =  this.authService.user.subscribe(user => {
    this.isAuth = !!user
    console.log(!user)
    console.log(!!user)
   });
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipe().subscribe();
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
}
