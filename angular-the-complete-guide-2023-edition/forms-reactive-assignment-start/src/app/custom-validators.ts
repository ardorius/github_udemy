import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class CustomValidators{

    static notAllowedProjectName: string = 'Test';

    static invalidProjectName(control: FormControl): {[s:string]: boolean}{
        if(control.value == this.notAllowedProjectName){
          return {'projectNameIsForbidden': true};
        }    
        return null;
    }

    static asyncInvalidEmail(control: FormControl): Promise<any> | Observable<any>{
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