import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiproductService {
  public ecommerceRQSTOptions: any;
  constructor(private http:HttpClient) { }

  getproducts(){
    return this.http.get(`${environment.baseurl}/product/all`)
  }
  getproducts1(page:any){
    return this.http.get(`${environment.baseurl}/product/all/${page}`)
  }
  getcategorys(){
    return this.http.get(`${environment.baseurl}/category/all`)
  }
  getproductById(id:any){
    return this.http.get(`${environment.baseurl}/product/getone/${id}`)
  }
  addproduct(product:any){
    return this.http.post(`${environment.baseurl}/product/save`,product )}

 deleteproduct(id:any){
      return this.http.delete(`${environment.baseurl}/product/delete/${id}`)}

updateproduct(id:any,newproduct:any){
  return this.http.put(`${environment.baseurl}/product/update/${id}`,newproduct)
}


 /**
   * Add to cart details
  */
addToCart(sessionInfoDt:any, productInfoDt:any): Observable<any> {
  const apiURL = `${environment.baseurl}/cart/`;
  const authData = {sessionInfo: sessionInfoDt, productsInfo: productInfoDt};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}


 /**
   * Check product availability in cart
  */
  isAvailableInCart(email:any): Observable<any> {
    const apiURL =`${environment.baseurl}/cart/check`;
    const authData = {email: email};
    return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
    .pipe(map(response => {
      return response;
    }));
  }


   /**
   * Add product quantity to buy
  */
 productAddToBuy(email:any, id:any, price:any, qty:any): Observable<any> {
  const apiURL =`${environment.baseurl}/cart/addqty`;
  const authData = {email: email, id: id, price: price, qty: qty};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}




  /**
   * Delete product quantity to buy
  */
 productDeleteToBuy(email:any, id:any, price:any, qty:any): Observable<any> {
  const apiURL =`${environment.baseurl}/cart/deleteqty`;
  const authData = {email: email, id: id, price: price, qty: qty};
  return this.http.post(apiURL, authData, this.ecommerceRQSTOptions)
  .pipe(map(response => {
    return response;
  }));
}



 /**
   * Remoe product from cart
  */
  productRemoveFromCart(email:any, id:any): Observable<any> {
    const apiURL = `${environment.baseurl}/cart/removeprod`;
    const authData = {email: email, id:id};
    return this.http.post(apiURL, authData)
    .pipe(map(response => {
      return response;
      
    }));
  
  }

 
}
