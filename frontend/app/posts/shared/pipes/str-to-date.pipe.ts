/**
 * Created by Elf on 31.05.2016.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toDate'})
export class StringToDatePipe implements PipeTransform {

    transform(value:any, ...args):any {
        if(value){
            return new Date(value);
        }
    }
}