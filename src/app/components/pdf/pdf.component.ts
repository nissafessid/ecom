import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Toaster, ToastType } from 'ngx-toast-notifications';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  data1 : string;
  data2 : string;
  private types:Array<ToastType>=['success'];
  @ViewChild('div1', { static: false }) div1: ElementRef;
 
  constructor(private toaster:Toaster,private render:Renderer2) { }

  ngOnInit(): void {
    this.data1="The content is displayed from Demo1 component";
    console.log(this.data1)
    this.data2="The content is displayed from Demo2 component";
    console.log(this.data2)

  }
  public openPDF():void {
    let DATA = document.getElementById('htmlData')!;
        
    html2canvas(DATA).then((canvas) => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('facture.pdf');
    });     
    }

    showToast() {
      const type = this.randomType;
      this.toaster.open({
        text: 'entre eeeeeeeeeee',
        caption: 'Alert',
        type: type,
      });
    }
    get randomType(){
      return this.types[Math.ceil((Math.random()*8))%this.types.length];
    }

    insertBeforeDiv1() {
      const div = this.render.createElement('div');
      const text = this.render.createText('This Text is Inserted before the div1');
      this.render.appendChild(div, text);
      this.render.appendChild(this.div1.nativeElement,div);
    }



   
  

    @ViewChild('accessId') accessId: ElementRef;
    ngAfterViewInit() {
      this.accessId.nativeElement.value = "Tony Stark";
    }

}
