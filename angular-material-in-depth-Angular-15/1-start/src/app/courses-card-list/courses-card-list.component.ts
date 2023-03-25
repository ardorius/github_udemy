import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { editCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {

  }

  editCourse(course: Course) {
    // 29. Angular Material Dialog - Final Implementation and Demo
    editCourseDialog(this.dialog, course)
    .pipe(
      filter(val => !!val)
    )
      .subscribe(val => console.log("new course value:", val)
    );

  }

}









