import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

const SAMPLE_TEXT =
  "LOREM IPSUM .ASDASD ASDIJODSFHOADJHG JOAFHGJO HFDOJGHOJDSFHGJSFDBNGJIBFSDJIOGBJFDSPG IKJFOSDPMG KMPOCAKSOPMC  KFOPDKS";

@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component {
  form = this.fb.group({
    title: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
    ],
    releasedAt: [new Date(1990, 0, 1), Validators.required],
    category: ["BEGINNER", Validators.required],
    courseType: ["premium", Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [
      SAMPLE_TEXT,
      [Validators.required, Validators.minLength(3), Validators.maxLength(300)],
    ],
  });
  //15. Angular Material Date Picker - Highlighting a Calendar Date
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    // console.log(cellDate, view)
    if (view == "month") {
      // console.log('date', date)
      return date == 1 ? "highlight-date" : "";
    }
    return "";
  };

  constructor(private fb: UntypedFormBuilder) {}

  get courseTitle() {
    return this.form.controls["title"];
  }
}
