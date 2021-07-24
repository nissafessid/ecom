import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appQuantityproduct]'
})
export class QuantityproductDirective {

  @Input('qte') qte :any
  @Input ('qteuser') qteuser:any
  constructor(private render:Renderer2, private el:ElementRef) { 
    
  }
  
  @HostListener("keyup") 
  setclick(){
    if(this.qte<this.qteuser){
      this.render.setStyle(this.el.nativeElement,"backgroundColor","green")
    }
    else{
      this.render.setStyle(this.el.nativeElement,"backgroundColor","black")

    }
  }

}
