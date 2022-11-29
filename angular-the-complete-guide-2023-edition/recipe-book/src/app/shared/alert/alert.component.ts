import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string = null;
  @Output() close = new EventEmitter<void>();
  // @Output() close = new Subject<void>();

  onClose(){
    this.close.emit();
    // this.close.next();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
