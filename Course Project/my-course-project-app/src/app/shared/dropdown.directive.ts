import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isToggled: boolean
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /* @HostListener('click', ['$event'])
  onClick() {
    if (this.isToggled) {
      //this.renderer.removeClass(this.elementRef.nativeElement, 'open')
      this.isOpen = this.isToggled;
      this.isToggled = !this.isToggled
    } else {
      //this.renderer.addClass(this.elementRef.nativeElement, 'open')
      this.isOpen = this.isToggled;
      this.isToggled = !this.isToggled;
    }
  } */

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
