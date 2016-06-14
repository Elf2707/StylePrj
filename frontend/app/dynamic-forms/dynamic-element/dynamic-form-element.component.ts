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
        return this.form.controls[this.element.key].valid;
    }

    get isPending(){
        return this.form.controls[this.element.key].pending;
    }

    get isDirty() {
        return this.form.controls[this.element.key].dirty;
    }

    get getErrors(){
        return this.form.controls[this.element.key].errors;
    }
}
