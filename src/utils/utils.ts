import { Notify } from 'quasar';
import { NotifyInterface } from './interfaces';

export const showNotify = (config: NotifyInterface) => {
    Notify.create({
        message: config.msg,
        position:'top-right',
        color: config.color,
        icon:config.icon,
        progress: true,
        actions: [{ icon: 'close', color: 'white' }]
    });
}

export const randomColor = () => {
    let maxVal:number = 0xffffff; // 16777215
    let randomNumber:number = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    let randNumber:string = randomNumber.toString(16);
    let randColor:string = randNumber.padStart(6, '0');
    return `#${randColor}`;
};

export const toBase64 = async (file:any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};

export const Base64ToFile = (dataurl:string, filename:string) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

export const validateRoute = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        const data = atob(token.split(".")[1]);
        const exp = JSON.parse(data).exp;
        if (exp < Date.now() / 1000) {
            return false;
        } else {
            return true;
        }
    }
};