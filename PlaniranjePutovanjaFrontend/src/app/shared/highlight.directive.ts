import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightTitle]',
  standalone: true
})
export class HighlightTitleDirective {
  @Input('appHighlightTitle') highlightColor = '#77BEF0';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    const title = this.el.nativeElement.querySelector('.card-title');
    if (title) {
      this.renderer.setStyle(title, 'color', this.highlightColor);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    const title = this.el.nativeElement.querySelector('.card-title');
    if (title) {
      this.renderer.removeStyle(title, 'color');
    }
  }
}
