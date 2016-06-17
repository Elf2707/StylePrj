/**
 * Created by Elf on 05.06.2016.
 */
import {Injectable} from '@angular/core';
import {ControlGroup, FormBuilder, Validators, Control} from '@angular/common';
import {ElementBase} from '../../base-elements/element-base';
import UserExistenceValidator from "../../../users/shared/user.validator";
import GroupElementsBase from "../../base-elements/group-elements-base";
import PasswordValidator from "../../../users/shared/password.validator";

@Injectable()
export class ElementControlService {
    constructor(private fb:FormBuilder) {
    };

    toControlGroup(elements:ElementBase<any>[]):any {
        let group = {};

        elements.map(element => {
            //Make element and add it to group
            if (!element.hasOwnProperty('elements')) {
                group[element.key] = this.elementToControl(element);
            } else {
                group[element.key] = this.groupToControl(element);
            }
        });

        return this.fb.group(group);
    }

    elementToControl(element:ElementBase<any>):Control {
        let syncValidators = [];

        //Standard syncValidators
        if (element.required) {
            syncValidators.push(Validators.required);
        }

        if (element.patternMatch) {
            syncValidators.push(Validators.pattern(element.patternMatch))
        }

        if (element.minLength) {
            syncValidators.push(Validators.minLength(element.minLength))
        }

        if (element.maxLength) {
            syncValidators.push(Validators.maxLength(element.maxLength))
        }

        let asyncValidators = [];
        //Add async validation
        if (element.customValidExistance) {
            if (element.key === 'email') {
                asyncValidators.push(UserExistenceValidator.checkEmail);
            }

            if (element.key === 'displayName') {
                asyncValidators.push(UserExistenceValidator.checkUsername);
            }
        }

        return new Control(element.value || '',
            Validators.compose(syncValidators),
            Validators.composeAsync(asyncValidators));

    }

    groupToControl(elementsGroup):ControlGroup {
        let group:{[key:string]:any} = {};
        var syncValidators:{ equalsValid?:any} = {};

        //Standard syncValidators
        if (elementsGroup.equalsValid) {
            syncValidators.equalsValid = PasswordValidator.equalsValid('password', 'confirmPassword');

        }

        elementsGroup.elements.map(element => {
            group[element.key] = this.elementToControl(element);
        });

        return new ControlGroup(group, {}, Validators.compose([syncValidators.equalsValid]));
    }
}