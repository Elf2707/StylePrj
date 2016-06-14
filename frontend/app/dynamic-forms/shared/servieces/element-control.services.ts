/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';
import {ControlGroup, FormBuilder, Validators, Control} from '@angular/common';
import {ElementBase} from '../../base-elements/element-base';
import UserExistenceValidator from "../../../users/shared/user.validator";

@Injectable()
export class ElementControlService {
    constructor(private fb:FormBuilder){};

    toControlGroup(elements:ElementBase<any>[]):any{
        let group = {};

        elements.map(element => {
            let syncValidators = [];

            //Standard syncValidators
            if(element.required){
                syncValidators.push(Validators.required);
            }

            if(element.patternMatch){
                syncValidators.push(Validators.pattern(element.patternMatch))
            }

            if(element.minLength){
                syncValidators.push(Validators.minLength(element.minLength))
            }

            if(element.maxLength){
                syncValidators.push(Validators.maxLength(element.maxLength))
            }

            let asyncValidators = [];
            //Add async validation
            if(element.customValidByType) {
                if (element.key === 'email') {
                    asyncValidators.push(UserExistenceValidator.checkEmail);
                }

                if (element.key === 'displayName') {
                    asyncValidators.push(UserExistenceValidator.checkUsername);
                }
            }

            //Make element and add it to group
            group[element.key] = new Control( element.value || '',
                                Validators.compose(syncValidators),
                                Validators.composeAsync(asyncValidators));

        });

        return this.fb.group(group);
    }
}