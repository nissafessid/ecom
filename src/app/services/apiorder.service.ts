import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiorderService {

  constructor(private http:HttpClient) { }
  getcart(email:any){
    return this.http.post(`${environment.baseurl}/order/getcart`,{"email":email})}
    
  addorder(orderemail:any,idorder:any){
    const authData = {email: orderemail, id_cart: idorder};
    console.log("data",authData)
      return this.http.post(`${environment.baseurl}/order/save`,authData )}





  getorders(){
    return this.http.get(`${environment.baseurl}/order/all`)
  }
  getorderById(id:any){
    return this.http.get(`${environment.baseurl}/order/getone/${id}`)
  }
 deleteorder(id:any){
      return this.http.delete(`${environment.baseurl}/order/delete/${id}`)}

updateorder(id:any,neworder:any){
  return this.http.put(`${environment.baseurl}/order/update/${id}`,neworder)
}




}
