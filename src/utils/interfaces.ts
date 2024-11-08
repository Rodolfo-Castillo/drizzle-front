export interface NotifyInterface {
    msg: string;
    color: string;
    icon: string;
}

export interface RegisterInterface {
    name: string;
    email: string;
    password: string;
    age: number;
}

export interface ValidPasswordInterface {
    length: boolean;
    capital: boolean;
    number: boolean;
    symbol: boolean;
}

export interface CategoryInterface {
    idCategory: number;
    categoryName: string;
}

export interface ProductInterface {
    idProduct: number;
    productName: string;
    price: number;
    stock: number;
    image: string;
    categoryId? : number;
    categoryName?: string;
}