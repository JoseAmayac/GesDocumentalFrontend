import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Pipe({
  name: 'file'
})
export class FilePipe implements PipeTransform {

  transform(name:string): any {
    return `${url}/documents/file/${name}`;
  }

}
