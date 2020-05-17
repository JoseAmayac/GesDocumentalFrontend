import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dependency } from '../interfaces/interfaces';

const url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class DependenciesService {

  constructor(private http:HttpClient) { }

  getDependencies(){
    return this.http.get<Dependency[]>(`${url}/dependencies`);
  }

  addDependency(dependency:Dependency){
    return this.http.post(`${url}/dependencies`,dependency);
  }

  deleteDependency(dependency:Dependency){
    return this.http.delete(`${url}/dependencies/${dependency.id}`);
  }
}
