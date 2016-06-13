/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';
import {ControlGroup, FormBuilder, Validators} from '@angular/common';
import {ElementBase} from '../../base-elements/element-base';
import UserExistenceValidator from "../../../users/shared/user.validator";

@Injectable()
export class ElementControlService {
    constructor(private fb:FormBuilder){};

    toControlGroup(elements:ElementBase<any>[]):any{
        let group = {};

        elements.map(element => {
            let validators = [];

            if(element.required){
                validators.push(Validators.required);
            }
            if(element.patternMatch){
                validators.push(Validators.pattern(element.patternMatch))
            }

            group[element.key] = validators.length?[element.value || '']:[element.value || '',
                        Validators.compose(validators)];

            if(element.key === 'email'){
                group[element.key].push(UserExistenceValidator.checkEmail);
            }

            if(element.key === 'dispalyName') {
                group[element.key].push(UserExistenceValidator.checkUsername);
            }
        });

        return this.fb.group(group);
    }
}