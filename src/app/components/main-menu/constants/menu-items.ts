import { MenuItem } from '../interfaces/menu-item.interface';

export const FAVORITE_ITEM: MenuItem = {
  id: 16,
  name: 'Избранное',
  redirect: 'favorite',
  icon: './assets/menu-icons/star-icon.svg'
};

export const AUTH_ITEM: MenuItem = {
  id: 17,
  name: 'Авторизация',
  redirect: 'auth',
  icon: './assets/menu-icons/sign-in.png'
};

export const ACCOUNT_ITEM: MenuItem = {
  id: 18,
  name: 'Личный кабинет',
  redirect: 'account',
  icon: './assets/menu-icons/user-solid.svg'
};
