import { Directive, ElementRef, HostListener, AfterViewChecked,Input } from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective implements AfterViewChecked {

  @Input() appModal: string;

  constructor(
      private element: ElementRef
  ) { }

  ngAfterViewChecked() {
      // function to go here
      this.initModalBox(this.element.nativeElement, this.element.nativeElement.getAttribute('data-modal'));
  }

  @HostListener('click') onclick() {
      this.initModalBox(this.element.nativeElement, this.element.nativeElement.getAttribute('data-modal'));

      const modalElement:any = document.getElementById(this.element.nativeElement.getAttribute('data-modal'));

      this.element.nativeElement.classList.toggle('modal-active');
      modalElement.classList.toggle('modal-open');
  }

  initModalBox(button: HTMLElement, modalDialog: string) {
      const trigger: HTMLElement = button;
      const triggerPos = trigger.getBoundingClientRect();

      const modalElement:any = document.getElementById(modalDialog);

      modalElement.style.top = `${triggerPos.top}px`;
      modalElement.style.left = `${triggerPos.left}px`;
      modalElement.style.height = `${triggerPos.height}px`;
      modalElement.style.width = `${triggerPos.width}px`;

      modalElement.style.position = 'fixed';

      const closeElement = modalElement.getElementsByClassName('close-modal')[0];

      closeElement.addEventListener('click', function () {
          modalElement.classList.toggle('modal-open');
          // this.element.nativeElement.classList.toggle('modal-active');
          document.getElementsByClassName(modalElement.getAttribute('id'))[0].classList.toggle('modal-active');
      });
  }

}
