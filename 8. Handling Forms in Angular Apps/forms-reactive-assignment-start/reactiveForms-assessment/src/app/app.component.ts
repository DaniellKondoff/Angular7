import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup
  projectStatuses: ['Stable', 'Critical', 'Finished']
  forbiddenUsername = ['Test'];


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], this.forbiddenNamesAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('critical')
    })
  }


  onSubmit(){
    console.log(this.projectForm)
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUsername.indexOf(control.value) !== -1 ){
      return {'nameIsForbiddes': true}
    }
    return null
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Test'){
          resolve({'nameIsForbidden': true})
        } else {
          resolve(null)
        }
      },1500)
    })

    return promise
  }
}
