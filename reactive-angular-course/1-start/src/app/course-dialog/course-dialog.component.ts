import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { CoursesService } from "../services/courses.services";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    // 24. Store Optimistic Data Modification Operations - API Design
    private coursesStore: CoursesStore,
    // private coursesService: CoursesService,
    // private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });

    // 16. Understanding the Angular Component providers property
    // this.loadingService.loadingOn();
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    this.coursesStore
      .saveCourse(this.course.id, changes)
      // .pipe(
      //   catchError((err) => {
      //     const message = "Cound not save course";
      //     console.log(message, err);
      //     this.messagesService.showErrors(message);
      //     return throwError(err);
      //   })
      // )
      .subscribe();

      this.dialogRef.close(changes);


    // this.coursesService.saveCourse(this.course.id, changes)
    // .subscribe(
    //   (val) => {
    //     this.dialogRef.close(val);
    //   }
    // );

    // 16. Understanding the Angular Component providers property
  //   this.loadingService
  //     .showLoaderUnitCompleted(saveCourse$)
  //     .subscribe((val) => {
  //       this.dialogRef.close(val);
  //     });
  }

  close() {
    this.dialogRef.close();
  }
}
