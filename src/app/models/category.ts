export interface Genre {
  id: number;
  name: string;
  name_en: string;
  is_main: boolean;
  ch_count?: number;
}

export interface Category {
  id: number;
  name: string;
  name_en: string;
  genres: Genre[];
}
