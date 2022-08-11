export interface UserInfo {
    about: string;
    email: string;
    name: string;
    pass_code: string;
    sex: string;
    user_id: string;
    year: string;
    phone: string;
}

export interface UserSubscription {
  is_active: number;
  created_at: string;
  product_id: number;
  product_name: string;
  product_option_name: string;
  started_at: string;
  expired_at: string;
  cost: number;
  is_selected?: boolean;
  product_option_id?: number;
}

export interface PackageTariffOption {
  id: number;
  states: PackageTariffState[];
}

export interface PackageTariffState {
  name: string;
  value: boolean;
}


export interface TariffOption {
    product_option_id: number;
    name: string;
    price: number;
    currency: string;
    price_formatted: string;
}

export interface Tariff {
    product_id: number;
    name: string;
    options: TariffOption[];
    is_selected?: boolean;
}

export interface Package {
  id: number;
  name: string;
  items: PackageItem[];
}

export interface PackageItem {
  id: number;
  name: string;
  cost: number;
  first_month?: number;
  pay_avaliable?: string[];
  customBigPrice?: string;
  customSmallPrice?: string;
  smallLinedText?: string;
  bigLinedText?: string;
  next?: string;
  imageSrc?: string;
  paymentCondition?: string;
  paymentLinedText?: boolean;
  onlyPromo?: boolean;
}

export class Products {
    currency: string;
    pay_sys: string[];
    products: Tariff[];

    constructor() {
        this.products = [];
    }
}

export interface AuthUser {
    auth_token: string;
    user_id: string;
}

export class Payment {
    pay_sys: string;
    product_option_id: number[];

    constructor(pay_sys: string, option_id: number[]) {
        this.pay_sys = pay_sys;
        this.product_option_id = option_id;
    }
}

export interface PaymentInfo {
    description: string;
    invoice_id: number;
    payment_page_url: string;
    payment_url?: string;
    sms: Sms;
    user_id: string;
}

export interface FeedbackData {
  name: string;
  subject: string;
  phone: string;
  message: string;
  email: string;
}

export interface CodeData {
    code: string;
    phone?: string;
    email?: string;
}

export interface RetailData {
  seller_id: string;
  seller_username: string;
  shop_code: string;
  shop_id: string;
  status: string;
}

interface Sms {
    phone: string;
    message: string;
}
