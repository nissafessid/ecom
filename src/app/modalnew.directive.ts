import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
@Directive({
  selector: '[appModalnew]'
})
export class ModalnewDirective {
  @Input() title: any;
  @Input() componentData: any;
  @Input() componentName: any;


  @HostListener('click', ['$event'])
  /* modal create */
  openModal() {
    console.log('clicccccccccccccck',this.title)
    this.createModalDialog(ModalDialogComponent);
  }

  
  constructor(
        private el: ElementRef,
        private ren: Renderer2,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.ren.setStyle(this.el.nativeElement,"background-color","gray");
   }
  createModalDialog(modalDialogComponent:any) {
    this.viewContainer.clear();
    const modalDialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(modalDialogComponent);
    const modalDialogComponentRef:any = this.viewContainer.createComponent(modalDialogComponentFactory);
     modalDialogComponentRef.instance['title'] = this.title;
     modalDialogComponentRef.instance['componentData'] = this.componentData;
     modalDialogComponentRef.instance['componentName'] = this.componentName;
    return modalDialogComponentRef;
  }

}
