import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // clickedValue: string;

  constructor(private elRef: ElementRef) { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpenxxx(event: Event){
    this.isOpen = 
    this.elRef.nativeElement.contains(event.target) 
    ? !this.isOpen : false;
    // var target = event.target || event.srcElement;
    // var id = target['id'];
    // this.clickedValue = id;
    // console.log("clicked: " + this.clickedValue + event.timeStamp);
  }

}
