export interface Props extends Partial<Pick<HTMLTextAreaElement, 'required' | 'dataset'>> {
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
}
