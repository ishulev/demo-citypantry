import { Directive, Input, HostListener } from '@angular/core';
// The idea for this directive is to prevent default for all anchor elements
@Directive({
  // tslint:disable-next-line
  selector: '[href]'
})
export class HrefPreventDefaultDirective {
  @Input() href: string;

  @HostListener('click', ['$event'])
  preventDefault(event) {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
    }
  }
}
