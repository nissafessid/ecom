import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ApiloginService } from 'src/app/services/apilogin.service';
import { ApiproductService } from 'src/app/services/apiproduct.service';
import { FavorisprodService } from 'src/app/services/favorisprod.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listcategorys:any
  listproducts:any
  arrays:any=[]
  wishlist:any=[]
  category=""
  totalPrice = 0;
  currencyCode: string;
  totalDeliveryAmt = 0;
  totalPayableAmt = 0;
  constructor(private apidata:ApiloginService,private route: Router,private apidata1:ApiproductService,
    private favorisprod:FavorisprodService) { }
  ngOnInit(): void {
     this.getfavoris()
    this.getAllcategorys()
    this.priceCount()
  }


  logout() {
    localStorage.clear()
    Swal.fire({
      text:"success",
      icon:"success"
    })
    this.apidata.logout().subscribe((res:any)=>{
      console.log(res)
      this.route.navigateByUrl('/login')

})

 }

 getAllcategorys(){
  this.apidata1.getcategorys().subscribe((res:any)=>{
    this.listcategorys=res["date"]
    console.log("reponse",res)
  })
}

OnChange(c:any){
  console.log('c',c.target.value)
  this.route.navigateByUrl(`/category/${c.target.value}`) 
  }

 isConnect(){
   return localStorage.getItem('state') =="0" ? true :false
 }


 getfavoris(){
 this.wishlist= this.favorisprod.getfavorisFromItems() 
  console.log('liste favoris',this.wishlist)
}
removeProduct(i:any) {
  if (i > -1) {
      this.wishlist.splice(i, 1);
  } 
  this.favorisprod.updateItemsInfavoris(this.wishlist);
}
priceCount() {
  this.totalPrice = 0;
  this.wishlist.forEach((element:any) => {
    this.totalPrice += element.prix;
    this.currencyCode = element.currencyCode;
    this.totalDeliveryAmt += element.deliveryPrice;
  });
  this.totalPayableAmt = this.totalPrice + this.totalDeliveryAmt;
}
}
