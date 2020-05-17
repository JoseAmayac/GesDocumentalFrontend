import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePipe } from './file.pipe';



@NgModule({
  declarations: [FilePipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilePipe
  ]
})
export class PipesModule { }
