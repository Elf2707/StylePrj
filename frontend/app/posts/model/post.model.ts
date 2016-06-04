export class Post {
    constructor(public _id:string,
                public author:string,
                public theme:string,
                public title:string,
                public subTitle:string,
                public body:string,
                public postDate:string) {
    }
}