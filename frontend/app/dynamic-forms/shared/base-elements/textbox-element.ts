/**
 * Created by Elf on 05.06.2016.
 */
import {ElementBase} from './element-base';

export class TextboxElement extends ElementBase<string> {
    controlType = 'textbox';
    type:string;

    constructor(options:{} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
