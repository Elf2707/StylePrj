/**
 * Created by Elf on 05.06.2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ControlGroup} from '@angular/common';

import {ElementBase} from '../shared/base-elements/element-base';
import {ElementControlService} from '../shared/servieces/element-control.services';
import {DynamicFormElementComponent} from '../shared/dynamic-element/dynamic-form-element.component';

@Component({
    selector: 'dynamic-form',
    templateUrl: 'app/dynamic-forms/shared/dynamic-element/dynamic-form-element.component.html',
    directives: [DynamicFormElementComponent],
    providers: [ElementControlService]
})
export class RegistrationFormComponent implements OnInit {
    @Input() elements: ElementBase<any>[] = [];
    form: ControlGroup;
    payLoad = '';

    constructor(private elementControlService: ElementControlService){};

    ngOnInit(){
        this.form = this.elementControlService.toControlGroup(this.elements);
    }

    onSubmit(){
        this.payLoad = JSON.stringify(this.form.value);
    }
}