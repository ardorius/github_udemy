import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { editCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  cols = 3;
  rowHeight = '500px';

  constructor(
    private dialog: MatDialog,
    private responsive: BreakpointObserver
  ) {
  }
  // 35. The Angular Material Responsive Breakpoint Observer Service
  ngOnInit() {
    this.responsive.observe(
      [
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape
      ]
    )
      .subscribe(
        result => {
          const breakpoints = Object.keys(result.breakpoints);
          const activeBreakpoint = breakpoints.find(breakpoint => result.breakpoints[breakpoint]);
          console.log("activeBreakpoint:", activeBreakpoint);
          switch (activeBreakpoint) {
            case Breakpoints.HandsetPortrait:
              this.cols = 1;
            case Breakpoints.HandsetLandscape:
              this.cols = 1;
              this.rowHeight = '430px';
              break;
              case Breakpoints.TabletPortrait:
                this.cols = 1;
              case Breakpoints.TabletLandscape:
                // console.log("TabletLandscape:", this.rowHeight);
                this.cols = 2;
              // this.rowHeight = '600px';
              break;
            default:
              this.cols = 3;
              this.rowHeight = '500px';
          }
        }
      );
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









