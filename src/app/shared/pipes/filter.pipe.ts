import { Pipe, PipeTransform } from '@angular/core';
import { task } from 'src/app/config/config.types';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: task[], key?:string): task[] {
    if(key){
      const nameRegex = new RegExp(key.toLowerCase())

      return value.filter((task)=>nameRegex.test(task.name.toLowerCase()))
    }else{
      return value
    }
  }
  
}
