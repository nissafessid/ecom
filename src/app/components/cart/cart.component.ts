import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listproducts:any
  listcategorys:any
  productForm: FormGroup;
  submitted=false
  term_search:any=""
  p:number=1
  isLoading: Boolean = true;
  imgURL: string;
  errorData: any;
  cartProducts = [];
  nopic: string;
  totalPrice = 0;
  currencyCode: string;
  totalDeliveryAmt = 0;
  totalPayableAmt = 0;
  email=""
  constructor(private formBuilder: FormBuilder,private apidata:ApiproductService,
     private modalService: NgbModal,
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









 

}
