export interface Person {
  info: string;
  international_name: string;
  name: string;
  person_id: number;
  photo: string;
}

export interface Persons {
  persons: Person[];
}
