import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GeneralInformation } from '../interfaces/interfaces';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient) { }


  getInfo(){
    return this.http.get<GeneralInformation>(`${url}/general`);
  }
}
