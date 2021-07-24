import { Renderer2 } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import { FavorisprodService } from 'src/app/services/favorisprod.service';
import { Constants } from '../constants/constants';


@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  listcategorys:any
  product:any
  qty_user:number=1
  id=this.activeroute.snapshot.params.id
  public productDt: Product;
  statusTxt: {};
  status:string=  ""
  productId: string;
  isProductInCartPresent: Boolean = false;
  isLoading: Boolean = true;
  constructor(private apidata:ApiproductService,  private router: Router,
     private activeroute:ActivatedRoute, private constants: Constants,
     private favorisprod:FavorisprodService,
     private render:Renderer2) { }

  ngOnInit(): void {
    this.getoneproduct()
    this.productDt= new Product()
    this.checkProductInCart(JSON.parse(localStorage.getItem("userconnect")!).email);

  }
   

  getoneproduct(){
    this.apidata.getproductById(this.id).subscribe((res:any)=>{
      console.log('detail one product',res)
      this.product=res["date"]
      this.productDt.productId=res["date"]._id;
      this.productDt.Quantity=res["date"].Quantity;
      this.productDt.prix=res["date"].prix;
      this.productDt.name=res["date"].name;
      this.productDt.description=res["date"].description;
      this.productDt.deliveryPrice=res["date"].deliveryPrice;
      this.productDt.Status=res["date"].Status;
      this.productDt.image=res["date"].image;

      this.productDt.CurrencyCode=res["date"].CurrencyCode ;
      this.productDt.category=res["date"].id_category.title ;







      this.checkProductQuantity(res["date"].Quantity);
      console.log("product data",this.productDt)
    })
  }

  checkProductQuantity(quantity: number) {
    console.log('quantityyyy in stock',quantity)
    if (quantity === 0) {
      this.statusTxt = {type: this.constants.prod_NA, text: 'Product Unavailable'};
      this.status="Product Unavailable'"
    } else if (quantity <= 5) {
      this.statusTxt = {type: this.constants.prod_FEW, text: 'Hurry, Only ' + quantity + ' left!'};
      this.status='Hurry, Only ' + quantity + ' left!'
      
    } else {
      this.statusTxt = {type: this.constants.prod_AVAILABLE, text: 'Available'};
      this.status="Available"

    }
    console.log('this.statusTxt ', this.statusTxt);
  }



  getAllcategorys(){
    this.apidata.getcategorys().subscribe((res:any)=>{
      this.listcategorys=res["date"]
      console.log("reponse",res)
    })
  }

  minus(){
    this.qty_user--
    this.productDt.qauntity_buy=this.qty_user

  }
  plus(){
    this.qty_user++
    this.productDt.qauntity_buy=this.qty_user
  }
  addtocart() {
    const sessionInfo = {
      email: JSON.parse(localStorage.getItem("userconnect")!).email,
      name: JSON.parse(localStorage.getItem("userconnect")!).name,
      role: JSON.parse(localStorage.getItem("userconnect")!).role,
      adress: JSON.parse(localStorage.getItem("userconnect")!).adress,
      phone: JSON.parse(localStorage.getItem("userconnect")!).phone,
      city: JSON.parse(localStorage.getItem("userconnect")!).city,
      cin: JSON.parse(localStorage.getItem("userconnect")!).cin



    };
    console.log("data of product to send", this.productDt)
    this.apidata.addToCart(sessionInfo, this.productDt)
      .subscribe(
        data => {
          console.log('cartdata => ', data);
          this.router.navigate(['/cart']);
        },
        err => {
          console.log('erreur')
        }
    );
  }



  checkProductInCart(email:any) {
    this.apidata.isAvailableInCart(email).subscribe(
      data => {
        console.log("check data product to cart",data);
        if (data.productsInCart[0] && data.productsInCart[0].cartResponse.length > 0) {
          const cartProducts = data.productsInCart[0].cartResponse;
          cartProducts.forEach((element:any) => {
            if (element.productId === this.productId) {
              this.isProductInCartPresent = true;
            } else {
              this.isProductInCartPresent = false;
            }
          });
        }
        this.isLoading = false;
      },
      err => {
       console.log('erreur')
      }
    );
  }


  @ViewChild('icon') icon: ElementRef;
  addfavoris(){
    this.icon.nativeElement
    .setAttribute("style", "color: red; width: 600px; height: 40px; color:red");
    (<any>this.icon).color ='red';
    this.favorisprod.storeItemTofavoris(this.product)
    console.log('fffffffffffffff',this.product)
   
  }
 

}
