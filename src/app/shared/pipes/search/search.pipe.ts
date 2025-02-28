import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(myarray: any[], text: string): any {
    return myarray.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
