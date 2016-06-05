/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';
import {ControlGroup, FormBuilder, Validators} from '@angular/common';
import {ElementBase} from '../base-elements/element-base';

@Injectable()
export class ElementControlService {
    constructor(private fb:FormBuilder){};

    toControlGroup(elements:ElementBase<any>[]):any{
        let group = {};

        elements.map(element => {
            group[element.key] = element.required?[element.value || '', Validators.required]:
                [element.value || ''];
        });

        return this.fb.group(group);
    }
}