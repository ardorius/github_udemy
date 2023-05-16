import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoadingService{

  loading$: Observable<boolean>;
  // 13. Loading Service Reactive API Design
  showLoaderUnitCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn(){

  }

  loadingOff(){

  }

}
