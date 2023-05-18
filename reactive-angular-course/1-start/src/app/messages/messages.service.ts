import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
// 18. Error Handling with the catchError RxJs operator
@Injectable()
export class  MessagesService{
  // 19. Messages Service - Implementation Finished and Demo
  private subject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.subject.asObservable().pipe(
    filter(messages => messages && messages.length > 0)
  );

  showErrors(...errors: string[]){
    this.subject.next(errors);
  }
}
