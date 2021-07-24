import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiloginService {

 


  constructor(private http: HttpClient) { }
  token = localStorage.getItem("token")!
  headersoption = new HttpHeaders({
    "x-access-token": this.token
  })
  register(newcustomer: any) {
    return this.http.post(`${environment.baseurl}/customer/save`, newcustomer)
  }
  login(requestLogin: any) {
    return this.http.post(`${environment.baseurl}/users/auth`, requestLogin)
  }


  getusers() {
    return this.http.get(`${environment.baseurl}/customer/all`)
  }
  getuserById(id: any) {
    return this.http.get(`${environment.baseurl}/customer/getone/${id}`)
  }


  deleteuser(id: any) {
    return this.http.delete(`${environment.baseurl}/customer/delete/${id}`)
  }

  updateuser(id: any, newuser: any) {
    return this.http.put(`${environment.baseurl}/customer/update/${id}`, newuser)
  }

  logout() {
    let refreshtoken = localStorage.getItem("refreshtoken")
    return this.http.post(`${environment.baseurl}/users/logout`, { "refreshToken": refreshtoken },
      { headers: this.headersoption }
    )
  }
  forgetpassword(email:any){
    return this.http.post(`${environment.baseurl}/users/forget`, email)
  }
  resetpassword(resetLink:any,newpass:any){
    return this.http.post(`${environment.baseurl}/users/resetpassword/${resetLink}`,newpass)
  }
  getJwtToken(){
    return localStorage.getItem('token')!
  }
  refreshToken(){
    let params = {
      _id:localStorage.getItem('_id'),
      RefreshToken : localStorage.getItem("refreshtoken")};
    return this.http.post(`${environment.baseurl}/users/refresh`,params)

  }
}
