/**
 * Created by Elf on 31.05.2016.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shortCut'})
export class ShortCutPipe implements PipeTransform {

    transform(value:any, cutLen:number):any {
        if(value){
            if(!isNaN(cutLen) && isFinite(cutLen) && value.toString().length > cutLen){
                return value.toString().substring(0, cutLen) + '...';
            } else {
                return value;
            }
        }
    }
}