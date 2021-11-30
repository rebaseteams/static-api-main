import { question } from './question';

export type Template = {
    templateId : string,
    html : string,
    templateName : string,
    templateImg : string,
    questions : question[]
}
