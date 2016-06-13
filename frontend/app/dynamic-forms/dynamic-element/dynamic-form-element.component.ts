/**
 * Created by Elf on 05.06.2016.
 */
import {Component, Input} from '@angular/core';
import {ControlGroup} from '@angular/common';

import {ElementBase} from '../base-elements/element-base';

@Component({
    selector: 'df-element',
    templateUrl: 'app/dynamic-forms/dynamic-element/dynamic-form-element.component.html'
})

export class DynamicFormElementComponent {
    @Input() element:ElementBase<any>;
    @Input() form:ControlGroup;

    constructor(){
    }

    get isValid() {
        switch(this.element.key){
            case 'email':
                console.log('ssssssssssssssssssssssssssssssssssssssssssssssss ' + this.element.key );
                console.log(this.form.controls[this.element.key].value);
                break;

            case 'password':
                console.log(this.form.controls[this.element.key].value);
                break;

            case 'displayName':
                console.log(this.form.controls[this.element.key].value);
                break;
        }
        return this.form.controls[this.element.key].valid
    }
}
