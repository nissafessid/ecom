import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicartService {

  constructor(private http:HttpClient) { }

  getcarts(){
    return this.http.get(`${environment.baseurl}/cart/all`)
  }
  getcartById(id:any){
    return this.http.get(`${environment.baseurl}/cart/getone/${id}`)
  }
  addcart(cart:any){
    return this.http.post(`${environment.baseurl}/cart/save`,cart )}

 deletecart(id:any){
      return this.http.delete(`${environment.baseurl}/cart/delete/${id}`)}

updatecart(id:any,newcart:any){
  return this.http.put(`${environment.baseurl}/cart/update/${id}`,newcart)
}
}
