import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class LoadingService{

  // 14. Reactive Component Interaction using Custom Observables and Behavior Subject
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  // 13. Loading Service Reactive API Design
  showLoaderUnitCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn(){
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }

}
