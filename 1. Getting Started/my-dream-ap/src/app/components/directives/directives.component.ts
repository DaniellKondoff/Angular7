import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {
  showDetails = false;
  logs = [];

  constructor() { }

  ngOnInit() {
  }

  onClickDisplayDetails() {
    this.showDetails = !this.showDetails;
    //this.logs.push(this.logs.length + 1);
    this.logs.push(new Date)
  }

}
