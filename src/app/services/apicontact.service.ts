import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicontactService {

  constructor(private http:HttpClient) { }

  getcontacts(){
    return this.http.get(`${environment.baseurl}/contact/all`)
  }
  getcontactById(id:any){
    return this.http.get(`${environment.baseurl}/contact/getone/${id}`)
  }
  addcontact(contact:any){
    return this.http.post(`${environment.baseurl}/contact/save`,contact )}

 deletecontact(id:any){
      return this.http.delete(`${environment.baseurl}/contact/delete/${id}`)}

updatecontact(id:any,newcontact:any){
  return this.http.put(`${environment.baseurl}/contact/update/${id}`,newcontact)
}
}
