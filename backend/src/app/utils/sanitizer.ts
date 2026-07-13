import { parseHTML } from 'linkedom';
import DOMPurify from 'dompurify';

const { window } = parseHTML('<html><body></body></html>');
const purify = DOMPurify(window as any);

export const sanitize = (data: any): any => {
    if (typeof data === 'string') return purify.sanitize(data);
    if (typeof data === 'object' && data !== null) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = sanitize(data[key]);
        }
    }
    return data;
};
