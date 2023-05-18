// 21. Angular State Management - When is it Needed and Why?

import { Injectable } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  // 23. Step-by-Step Implementation of an Angular Store Service
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses(){

   const loadCourses$ = this.http.get<Course[]>('/api/courses')
    .pipe(
      map(response => response["payload"]),
      catchError(err => {
        const message = "Could not load courses";
        this.messages.showErrors(message);
        console.log(message, err)
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    );

    this.loading.showLoaderUnitCompleted(loadCourses$)
      .subscribe();
  }
  // 24. Store Optimistic Data Modification Operations - API Design
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any>{
    return
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category == category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
