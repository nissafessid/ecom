import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ApiorderService } from 'src/app/services/apiorder.service';
import { ApiproductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  pic: string;
  imgURL: string;
  @Input() custEmail :any;
  @Input() cartProducts:any;
  @Output() isCartChanged = new EventEmitter<any>();
  public productDt: Product;


  listproducts:any
  listcategorys:any
  productForm: FormGroup;
  submitted=false
  term_search:any=""
  p:number=1
  isLoading: Boolean = true;
  //imgURL: string;
  errorData: any;
//cartProducts = [];
  nopic: string;
  totalPrice = 0;
  currencyCode: string;
  totalDeliveryAmt = 0;
  totalPayableAmt = 0;
  email=""
  id_cart:any
  constructor(private formBuilder: FormBuilder,private apidata:ApiproductService,
     private modalService: NgbModal,private apiService:ApiorderService
    ) { }

  ngOnInit(): void {
   this.getSessionInfo()    

  }


  getSessionInfo(){
    const sessionInfo = {
      email: JSON.parse(localStorage.getItem("userconnect")!).email,
      name: JSON.parse(localStorage.getItem("userconnect")!).name,
      role: JSON.parse(localStorage.getItem("userconnect")!).role,
      adress: JSON.parse(localStorage.getItem("userconnect")!).adress,
      phone: JSON.parse(localStorage.getItem("userconnect")!).phone,
      city: JSON.parse(localStorage.getItem("userconnect")!).city,
      cin: JSON.parse(localStorage.getItem("userconnect")!).cin

  }
  this.email=sessionInfo.email

  this.checkProductInCart(sessionInfo.email);
  }

  checkProductInCart(email:any) {
    this.apidata.isAvailableInCart(email).subscribe(
      data => {
        console.log('reponse',data)
        this.id_cart=data.productsInCart[0]._id
        console.log('id_cart',this.id_cart)
        if (data.productsInCart.length > 0) {
          this.cartProducts = data.productsInCart[0].cartResponse;
          this.priceCount(this.cartProducts);
        } else {
          this.nopic = 'empty_product.svg';
        }
        this.isLoading = false;
        console.log(data);
      },
      err => {
       console.log('erreur')
      }
    );
  }



  priceCount(prdt:any) {
    console.log(prdt);
    this.totalPrice = 0;
    prdt.forEach((element:any) => {
      this.totalPrice += element.price_payable;
      this.currencyCode = element.currencyCode;
      this.totalDeliveryAmt += element.deliveryPrice;
    });
    this.totalPayableAmt = this.totalPrice + this.totalDeliveryAmt;
  }

  cartChange(evt:any) {
    if (evt === true) {
       this.checkProductInCart(this.email);
    }

  
}


addorder(email:any) {
  
    this.apiService.addorder(email,this.id_cart).subscribe(
      data => {
        console.log('reponse',data)
      },
      err => {
       console.log('erreur')
      }
    );
  }
}
