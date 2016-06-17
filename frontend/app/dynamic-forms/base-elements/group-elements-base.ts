/**
 * Created by Elf on 16.06.2016.
 */
import {ElementBase} from "./element-base";

export default class GroupElementsBase extends ElementBase<string> {
    controlType:string = 'groupOfControls';
    elements:ElementBase<any> [] = [];
    equalsValid:boolean = false;
    key:string = '';

    constructor(options:{
        elements?:ElementBase<any>[],
        equalsValid?:boolean,
        key?:string,
        order?:number
    } = {}){
        super(options);

        this.elements = options.elements;
        this.equalsValid = !!options.equalsValid;
        this.key = options.key || '';
    }
}