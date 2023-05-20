import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesService } from '../services/courses.services';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // 38. Refactoring an Angular Reactive Application to OnPush Change Detection
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    // private coursesService: CoursesService,
    // 21. Angular State Management - When is it Needed and Why?
    private coursesStore: CoursesStore
    // private loadingService: LoadingService,
    // private messagesService: MessagesService
  ) {

  }

  ngOnInit() {
    this.reloadCoures();
  }

  reloadCoures(){
 // 14. Reactive Component Interaction using Custom Observables and Behavior Subject
    // this.loadingService.loadingOn();

    // const courses$ = this.coursesService.loadAllCourses()
    // .pipe(
    //   map(courses => courses.sort(sortCoursesBySeqNo)), //,
    //  // 18. Error Handling with the catchError RxJs operator
    //   catchError(err => {
    //     const message = "Could not load courses";
    //     this.messagesService.showErrors(message);
    //     console.log(message, err);
    //     return throwError(err);
    //   })
    //   // finalize(() => this.loadingService.loadingOff())
    // );
    // 15. Loading Indication Service - Reactive Implementation Finished
    // const loadCourses$ = this.loadingService.showLoaderUnitCompleted(courses$);

    // courses$.subscribe(val => console.log(val));

    // 21. Angular State Management - When is it Needed and Why?

    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");

    // this.beginnerCourses$ = loadCourses$.pipe(
    //   map(courses => courses.filter(courses => courses.category == "BEGINNER"))
    // )
    // this.advancedCourses$ = loadCourses$.pipe(
    //   map(courses => courses.filter(courses => courses.category == "ADVANCED"))
    // );

  }





}




