import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  catchError,
  finalize,
} from "rxjs/operators";
import { merge, fromEvent, throwError } from "rxjs";
import { Lesson } from "../model/lesson";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;

  lessons: Lesson[] = [];

  loading = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  matsort: MatSort;

  // 26. Angular Material Data Table Data Selection

  selection = new SelectionModel<Lesson>(true, []);

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  displayedColumns = ["select","seqNo", "description", "duration"];

  expandedElement: Lesson = null;

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];

    this.loadLessonsPage();
  }

  onLessonToggled(lesson: Lesson) {
    this.selection.toggle(lesson);
  }

  // 21. Angular Material Data Table - Loading Data From the Backend
  loadLessonsPage() {
    this.loading = true;

    this.coursesService
      .findLessons(
        this.course.id,
        this.matsort?.direction ?? "asc",
        this.paginator?.pageIndex ?? 0,
        this.paginator?.pageSize ?? 3,
        this.matsort?.active ?? "seqNo")
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          console.log('Error loading lessons', err);
          alert('Error loading lessons');
          return throwError(err);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe((lessons) => (this.lessons = lessons));
  }

  onRowClicked(lesson) {
    if(this.expandedElement == lesson) {
      this.expandedElement = null;
    } else {
      this.expandedElement = lesson;
    }
  }

  // 24. Angular Material Data Table - Sorting Data
  ngAfterViewInit() {

    this.matsort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.matsort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.lessons.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.lessons.forEach(row => this.selection.select(row));
  }
}
