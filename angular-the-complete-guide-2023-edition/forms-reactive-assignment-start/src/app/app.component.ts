import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatus = ['Stable','Critical','Finished'];
  notAllowedProjectName = ['Test'];
  forbiddenEmail = 'test@test.sk';

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectData': new FormGroup({
        'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName.bind(this)]),
        'email': new FormControl(null,[Validators.required, Validators.email], CustomValidators.asyncInvalidEmail),
        'projectStatus': new FormControl('Critical')
      })
    })
  }

  onSubmit(){
    console.log(this.projectForm.value);
  }

  forbiddenProjectName(control: FormControl): {[s:string]: boolean}{
    if(this.notAllowedProjectName.indexOf(control.value) !== -1){
      return {'projectNameIsForbidden': true};
    }    
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.sk'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      }, 2000);
    });    
    return promise;
  }
}
