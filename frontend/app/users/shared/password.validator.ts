import {ControlGroup} from '@angular/common';
/**
 * Created by Elf on 16.06.2016.
 */
export default class PasswordValidator {
    static equalsValid(passwordKey:string, confirmPasswdKey:string):any {

        return (group:ControlGroup) => {
            console.log('password password passwordpasswordpasswordpasswordpasswordpasswordpassword')
            if(group.controls[passwordKey].value !==  group.controls[confirmPasswdKey].value ){
                return group[confirmPasswdKey].setErrors({
                    passwdNotEquals: true
                });
            }
        }
    }
}