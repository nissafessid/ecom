import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApicartService } from 'src/app/services/apicart.service';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.component.html',
  styleUrls: ['./cartdetail.component.css']
})
export class CartdetailComponent implements OnInit {
   
  pic: string;
  imgURL: string;
  @Input() custEmail :any;
  @Input() cartProducts:any;
  @Output() isCartChanged = new EventEmitter<any>();
  public productDt: Product;

  constructor(
    private apiService: ApiproductService
  ) {
    
  }

  ngOnInit() {
    this.productDt= new Product()

  }

  // minus(qty:any){
  //   this.qty--
  //   this.productDt.qauntity_buy=this.qty_user

  // }
  // plus(){
  //   this.qty++
  //   this.cartProducts.qauntity_buy=this.qty
  //   console.log('q', this.cartProducts.qauntity_buy)
  // }

  product_add(id:any, price:any, qty:any) {
     qty += 1;
    console.log(id, price, qty);
    this.apiService.productAddToBuy(this.custEmail, id, price,qty).subscribe((data:any) => {
      this.isCartChanged.next(true);
    });
     this.cartProducts.qauntity_buy=qty
     console.log(this.cartProducts.qauntity_buy)

  }
 

  product_delete(id:any, price:any, qty:any) {
    qty -= 1;
    this.apiService.productDeleteToBuy(this.custEmail, id, price, qty).subscribe(data => {
      this.isCartChanged.next(true);
      console.log(qty)
    });
  }

  product_remove_fromcart(id:any) {
    console.log(this.custEmail,id)

    this.apiService.productRemoveFromCart(this.custEmail, id).subscribe(data => {
      this.isCartChanged.next(true);
    console.log(this.custEmail,id)
    console.log("removed", data)
    });
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

}
