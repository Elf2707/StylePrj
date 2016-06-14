/**
 * Created by Elf on 05.06.2016.
 */
export class ElementBase<T> {
    value:T;
    value2:T;
    key:string;
    label:string;
    required:boolean;
    patternMatch:string;
    minLength:number;
    maxLength:number;
    customValidByType: boolean;
    order:number;
    controlType:string;
    placeholder:string;

    constructor(options:{
        value?:T,
        value2?:T, //Additional value for some categories of elements
        key?:string,
        label?:string,
        required?:boolean,
        patternMatch?:string,
        minLength?:number,
        maxLength?:number,
        customValidByType?:boolean,
        order?:number,
        controlType?:string,
        placeholder?:string
    } = {}){
        this.value = options.value;
        this.value2 = options.value2;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.patternMatch = options.patternMatch || '';
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.customValidByType = !!options.customValidByType;
        this.order = options.order === undefined ? 1: options.order;
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder
    }
}