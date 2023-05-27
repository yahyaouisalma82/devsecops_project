import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToText'
})
export class HtmlToTextPipe implements PipeTransform {

  transform(value: string): string { 
    return value? value.replace(/<[^>]+>/g, "") : '';
  }

}
