import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http:HttpClient) { }

  resetPassword(email:string){
    const data = {
      email
    }
    return this.http.post(`${url}/password/create`,data);
  }

  findUser(token){
    return this.http.get(`${url}/find/${token}`);
  }

  changePassword(data:any){
    return this.http.post(`${url}/reset`,data);
  }
}
