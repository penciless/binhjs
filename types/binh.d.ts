import * as GlobalBinh from './index';

declare global {
    interface Window {
        Binh: typeof GlobalBinh;
    }

    var Binh: typeof GlobalBinh;
}