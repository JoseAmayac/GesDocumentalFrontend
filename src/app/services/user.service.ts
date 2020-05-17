
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/interfaces';

const url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<Usuario[]>(`${url}/users`);
  }

  create(user:Usuario){
    return this.http.post(`${url}/users`,user);
  }

  delete(user:Usuario){
    return this.http.delete(`${url}/users/${user.id}`);
  }
}
