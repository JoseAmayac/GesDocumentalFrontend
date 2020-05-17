import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Document } from '../interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) { }

  uploadFile(formdata){
    return this.http.post(`${url}/documents`,formdata);
  }

  downloadVoucher(id){
    return this.http.get(`${url}/voucher/generate/${id}`,{
      responseType:'arraybuffer'
    });
  }

  getForDependency(){
    return this.http.get<Document[]>(`${url}/documents/dependency`);
  }

  getToAsign(){
    return this.http.get<Document[]>(`${url}/documents/toasign`);
  }
}
