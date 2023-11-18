export class Language {
    assert = { assert: { type: 'json' } };
    lang: any;
    async getLanguage(lang = 'he'): Promise<void> {
        this.lang = (await import(/* @vite-ignore */`${this.baseLangUrl}${lang}.json`, this.assert)).default;
    }
    constructor(private baseLangUrl = '../../i18n/') {
        // this.getLanguage();
    }
}