/**
 * Created by Elf on 06.06.2016.
 */
import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {DynamicFormComponent} from '../../dynamic-forms/dynamic-form/dynamic-form.component.ts';
import {FormsElementsService} from '../../dynamic-forms/shared/servieces/forms-elements.service.ts';
import UserService from "../shared/user.service";

@Component({
    selector: 'my-registration',
    templateUrl: 'app/users/registration/registration.component.html',
    directives: [DynamicFormComponent],
    providers: [FormsElementsService, UserService, HTTP_PROVIDERS]
})
export class RegistrationComponent {
    elements:any[];

    constructor(elementsService: FormsElementsService){
        this.elements = elementsService.getElementsForRegistrationForm();
    }
}
