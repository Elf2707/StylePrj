/**
 * Created by Elf on 06.06.2016.
 */
import {Component} from '@angular/core';

import {RegistrationFormComponent} from '../../dynamic-forms/registration-form/registration-form.component';
import {FormsElementsService} from '../../dynamic-forms/shared/servieces/forms-elements.service.ts';

@Component({
    selector: 'my-registration',
    templateUrl: 'app/users/registration/registration.component.html',
    directives: [RegistrationFormComponent],
    providers: [FormsElementsService]
})
export class RegistrationComponent {
    elements:any[];

    constructor(elementsService: FormsElementsService){
        this.elements = elementsService.getElementsForRegistrationForm();
    }
}
