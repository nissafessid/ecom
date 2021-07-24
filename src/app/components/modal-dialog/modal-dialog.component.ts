import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentLoaderServiceService } from 'src/app/services/component-loader-service.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  @Input() title: string;
  @Input() componentData: string;
  @Input() componentName: any;
  public name : any;

  @ViewChild('datacontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private el: ElementRef,
    private ren: Renderer2,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private loaderService :ComponentLoaderServiceService
  ) {}

  public div = this.ren.createElement('div'); 

  ngOnInit() {      

  }

  ngAfterContentInit(){
    this.ren.addClass(this.el.nativeElement.ownerDocument.body, 'modal-open');
    this.ren.appendChild(this.el.nativeElement, this.div);
    this.ren.setAttribute(this.div , 'class', 'modal-backdrop fade in');
    this.createModalPopup();
  }

  createModalPopup(){
    const name = this.loaderService.getComponents(this.componentName);
    console.log("Component Name => ",name);
    const myFactory = this.resolver.resolveComponentFactory(<any>name);
    const myRef:any = this.entry.createComponent(myFactory);
    myRef.instance['data'] = this.componentData;
  }

  closeModal() {
    this.ren.removeClass(this.el.nativeElement.ownerDocument.body, 'modal-open');
    this.ren.removeChild(this.el.nativeElement, this.div);
    this.el.nativeElement.remove();
  }


}

