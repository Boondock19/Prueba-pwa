import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitonly]'
})
export class DigitonlyDirective {
  
  private numArray: Array<string> = ['0','1','2','3','4','5','6','7','8','9']
  private notAccepted: Array<string> = ['`','a','b','c','d','e','f','g','h','i']
  constructor(private inputElement: ElementRef) { }

  @HostListener('keypress',['$event'])
  onkeypress(e: KeyboardEvent){

    console.log(`True or false , esta ${e.key} en el array?`,this.numArray.includes(e.key))

    if( !( this.numArray.includes(e.key) ) ){ // Si no lo incluye no lo coloca.
      e.preventDefault();
    }

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {

   
    console.log(`True or false , esta ${e.key} en el array?`,this.numArray.includes(e.key))

    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [ 'Enter', 'Tab', 'Backspace', 'Delete', 'Escape'].indexOf(e.key) !== -1 || 
      (e.key === 'A' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'C' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'V' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'X' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'A' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'C' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'V' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'X' && e.metaKey === true) || // Cmd+X (Mac)
      (e.key === '#' || e.key === '$' || e.key === '%' || e.key === '&' || e.key === "'") // Home, End, Left, Right
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || !( this.numArray.includes(e.key) ) ) && (!(this.notAccepted.includes(e.key)))
    ) {
      e.preventDefault();
    }

  }

}
