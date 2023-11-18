import { PageBase, PageDecorator } from "@decorators";

@PageDecorator
export class Contact extends PageBase {
    init() {
        console.log('Contact us');
    }
}