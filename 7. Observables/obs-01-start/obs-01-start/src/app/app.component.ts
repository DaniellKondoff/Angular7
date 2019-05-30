import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServise } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSubject: Subscription

  constructor(private userService: UserServise) {}

  ngOnInit() {
   this.activatedSubject = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(){
    this.activatedSubject.unsubscribe();
  }
}
