export interface BookGenre {
  litres_genre_id: number;
  type: string;
  name: string;
  token: string;
  count: number;
  genres?: BookGenre[];
}

export interface Book {
  id: number;
  title: string;
  annotation: string;
  adult: number;
  date_written_s: number;
  genres: Array<{ title: string }>;
  authors: Author[];
  file_groups: FileGroup[];
  price_byn: number;
  contract_title: string;
  cover?: string;
  gift?: boolean;
  chars?: number;
}

export interface BookFile {
  filename?: string;
  download: string;
  stream: string;
}

interface FileGroup {
  value: string;
  files: BookFile[];
}

interface Author {
  "first-name": string;
  "last-name": string;
}

export interface LoadAudiobooksParams {
  size: number;
  offset: number;
  genreId?: number;
}
