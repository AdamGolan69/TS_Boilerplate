import {} from '../footer/footer';

export interface BasePageText {
    FOOTER: FooterText;
}

export interface BaseText {
    TITLE: string;
}

export interface BaseExtendedText extends BaseText {
    DESC: string;
}

export interface BaseCardText extends BaseExtendedText {
    LINK?: string;
}