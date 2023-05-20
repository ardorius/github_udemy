import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent  {

  // 33. Angular Master Detail Implementation - Final Demo
  @Input() lesson: Lesson;

}
