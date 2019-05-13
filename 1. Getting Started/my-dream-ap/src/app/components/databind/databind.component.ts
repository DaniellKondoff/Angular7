import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-databind',
  templateUrl: './databind.component.html',
  styleUrls: ['./databind.component.css']
})
export class DatabindComponent implements OnInit {
  username: string = ''
  isUserNameEmpty = true
  constructor() { }

  ngOnInit() {
  }

  onClickClearUserName(){
    this.username = '';
  }

  onEnterUserName(event: Event){
    if((<HTMLInputElement>event.target).value.length > 0){
      this.isUserNameEmpty = false;
    }
    else{
      this.isUserNameEmpty = true;
    }
  }
}
