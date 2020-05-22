import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Document, Respuesta } from '../interfaces/interfaces';

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

  getFile(name:string){
    return this.http.get(`${url}/documents/file/${name}`,{
      responseType:"arraybuffer"
    });
  }
  

  asignDependency(dependency_id,documentoSeleccionado:number){
    const dependency = {
      dependency_id,
      id:documentoSeleccionado
    }
    return this.http.put(`${url}/documents/asignDependency`,dependency);
  }

  response(respuesta){
    return this.http.post(`${url}/responses`,respuesta);
  }

  getAllDocumets(){
    return this.http.get<Document[]>(`${url}/documents`);
  }

  delete(document:Document){
    return this.http.delete(`${url}/documents/${document.id}`);
  }

  downloadResponse(name:string){
    return this.http.get(`${url}/responses/download/${name}`,{
      responseType:'arraybuffer'
    });
  }
}
