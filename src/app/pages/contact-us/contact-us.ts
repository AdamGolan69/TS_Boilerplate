import { PageBase, PageDecorator } from "../../../decorators/page";

@PageDecorator
export class Contact extends PageBase {
    init() {
        console.log('Contact us');
    }
}