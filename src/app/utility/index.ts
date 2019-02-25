
export const iconDict = {
    'pencil': '0018-pencil4',
    'qrcode': '0249-qrcode',
    'books': '0150-books',
    'info': '1125-info2',
    'cogs': '0609-cogs',
    'enter': '1147-enter3',
    'exit': '1148-exit3',
    'plus': '1118-plus3',
    'home': '0005-home5',
    'map': '0326-map',
    'enlarge': '0573-enlarge',
    'car': '0779-car',
    'balance': '0742-balance',
    'images': '0059-images',
    'checkmark': '1139-checkmark4',
    'bubble-notification': '0495-bubble-notification2',
    'menu': '0882-menu7',
    'create': '0021-pencil7',
    'upload': '0393-upload',
    'close': '1134-cross2',
    'user': '0504-user',
    'lock': '0594-lock2',
    'eye': '0947-eye2',
    'eye-off': '0948-eye-blocked2',
}

export type Icomoons = keyof typeof iconDict;
export type Colors   = 'white' | 'dark' | 'blue' | 'orange';

export class Icomoon {
    static icon(name: Icomoons, color?: Colors, src: string = 'assets/icomoon') {
        return color ? `${src}/${iconDict[name]}_${color}.svg` : `${src}/${iconDict[name]}.svg`;
    }
}
