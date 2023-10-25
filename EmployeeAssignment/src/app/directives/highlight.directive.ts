import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  //https://angular.io/guide/attribute-directives
  constructor(private elem:ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(){
    this.highlight('violet');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.highlight('');
  }

  private highlight(color:string){
    this.elem.nativeElement.style.backgroundColor = color;
  }

}
