import { MenuItem } from './interfaces/menu-item.interface';

export const menus = {
  full: [
    {
      id: 15,
      name: 'Главная',
      redirect: 'home',
      icon: './assets/menu-icons/home-solid.svg'
    },
    {
      id: 7,
      name: 'ТВ: Обзор',
      redirect: 'tv-review',
      icon: './assets/menu-icons/live.png'
    },
    {
      id: 8,
      name: 'ТВ: Программа передач',
      redirect: 'tv-guide',
      icon: './assets/menu-icons/tv.png'
    },
    {
      id: 1,
      name: 'Фильмы',
      redirect: 'films',
      icon: './assets/menu-icons/film.png'
    },
    {
      id: 2,
      name: 'Сериалы',
      redirect: 'series',
      icon: './assets/menu-icons/serial.png'
    },
    {
      id: 3,
      name: 'Мультфильмы',
      redirect: 'cartoons',
      icon: './assets/menu-icons/mult.png'
    },
    {
      id: 4,
      name: 'Передачи',
      redirect: 'shows',
      icon: './assets/menu-icons/pere.png'
    },
    {
      id: 6,
      name: 'Курсы',
      redirect: 'courses',
      icon: './assets/menu-icons/courses.png'
    },
    {
      id: 9,
      name: 'Аудиокниги',
      redirect: 'audiobooks',
      icon: './assets/menu-icons/audio.png'
    },
    {
      id: 0,
      name: 'Поиск',
      redirect: 'search',
      icon: './assets/menu-icons/search-solid.png'
    }
  ],
  short: [
    {
      id: 15,
      name: 'Главная',
      redirect: 'home',
      icon: './assets/menu-icons/home-solid.svg'
    },
    {
      id: 7,
      name: 'ТВ: Обзор',
      redirect: 'tv-review',
      icon: './assets/menu-icons/live.png'
    },
    {
      id: 8,
      name: 'ТВ: Программа передач',
      redirect: 'tv-guide',
      icon: './assets/menu-icons/tv.png'
    },
    {
      id: 6,
      name: 'Курсы',
      redirect: 'courses',
      icon: './assets/menu-icons/courses.png'
    }
  ]
};

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
