import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.services';

// 36. Reactive Angular - The Single Data Observable Pattern
interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  // 34. Consolidation Exercise - Implementing the Course Screen in Reactive Style

  data$: Observable<CourseData>;


  constructor(
    private route: ActivatedRoute,
    private coursesService:CoursesService) {


  }

  ngOnInit() {

    const courseId = parseInt(this.route.snapshot.paramMap.get('courseId'));
    // 36. Reactive Angular - The Single Data Observable Pattern
    const course$ = this.coursesService.loadCourseById(courseId);
    // 35. Course Component Finished - Introduction to the Single Data Observable Pattern
    const lessons$ = this.coursesService.loadAllCourseLessons(courseId);

    // 36. Reactive Angular - The Single Data Observable Pattern
    this.data$ = combineLatest([course$, lessons$])
      .pipe(
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      )
  }


}











