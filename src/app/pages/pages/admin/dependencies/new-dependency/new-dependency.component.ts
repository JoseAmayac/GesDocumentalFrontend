import { Component, OnInit } from '@angular/core';
import { Dependency } from 'src/app/interfaces/interfaces';
import { DependenciesService } from 'src/app/services/dependencies.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-dependency',
  templateUrl: './new-dependency.component.html',
  styleUrls: ['./new-dependency.component.css']
})
export class NewDependencyComponent implements OnInit {

  dependency:Dependency = {};

  error = {
    name: null
  }

  constructor(private service:DependenciesService, private uiService:UiService, private router:Router) { }

  ngOnInit() {
  }

  addDependency(){
    this.service.addDependency(this.dependency).subscribe(
      res=>this.handleCorrectResponse(res)
      ,
      error=>this.handleErrorResponse(error)
    )
  }

  handleCorrectResponse(res){
    this.router.navigateByUrl('/dashboard/dependencies');
    this.uiService.mensajeExitoso(res.message);
  }

  handleErrorResponse(err){
    
    if (err.status === 422) {
      this.error = err.error.errors;
    } else {
      this.uiService.mensajeError('Algo salió mal')
    }
  }
}
