import { question } from './question';

export type Template = {
    templateId : string,
    html : string,
    email : string,
    templateName : string,
    templateImg : string,
    required: Array<string>,
    resources : Array< {name : string, url : string} >
    questions : question[]
}
