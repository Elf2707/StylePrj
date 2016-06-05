/**
 * Created by Elf on 05.06.2016.
 */
import {Component, Input} from '@angular/core';
import {ControlGroup} from '@angular/common';

import {ElementBase} from '../base-elements/element-base';

@Component({
    selector: 'df-element',
    templateUrl: 'app/dynamic-form/shared/dynamic-element/dynamic-form-element.component.html'
})

export class DynamicFormElementComponent {
    @Input() element:ElementBase<any>;
    @Input() form:ControlGroup;

    get isValid() {
        return this.form.controls[this.element.key].valid
    }
}
