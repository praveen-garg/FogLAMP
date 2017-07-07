import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform
{
    transform(value:any, args:string[]): any {
        let keys:any[] = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        keys.sort((a: any, b: any) => {
        if (a.key < b.key) {
            return -1;
        } else if (a.key > b.key) {
            return 1;
        } else {
            return 0;
        }
        }); 
        return keys;
    }
}