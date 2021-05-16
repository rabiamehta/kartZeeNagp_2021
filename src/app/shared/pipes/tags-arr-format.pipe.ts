import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagsArrFormat'
})
export class TagsArrFormatPipe implements PipeTransform {
  transform(input: Array<string>, sep = '   |   '): string {
    return input.join(sep).toString();
  }
}
