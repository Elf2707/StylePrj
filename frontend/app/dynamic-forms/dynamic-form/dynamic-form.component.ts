/**
 * Created by Elf on 05.06.2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ControlGroup} from '@angular/common';

import {ElementBase} from '../base-elements/element-base';
import {ElementControlService} from '../shared/servieces/element-control.services';
import {DynamicFormElementComponent} from '../dynamic-element/dynamic-form-element.component';
import UserService from "../../users/shared/user.service";

@Component({
    selector: 'dynamic-form',
    templateUrl: 'app/dynamic-forms/dynamic-form/dynamic-form.component.html',
    directives: [DynamicFormElementComponent],
    providers: [ElementControlService]
})
export class DynamicFormComponent implements OnInit {
    @Input() elements: ElementBase<any>[] = [];
    form: ControlGroup;
    payLoad = '';

    constructor(private elementControlService: ElementControlService,
                private userService: UserService) {};

    ngOnInit(){
        this.form = this.elementControlService.toControlGroup(this.elements);
    }

    onSubmit(){
        this.payLoad = JSON.stringify(this.form.value);
    }
}