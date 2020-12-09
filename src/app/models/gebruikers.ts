import {Adres} from './adres';

export interface Gebruiker{
  voornaam: string;
  achternaam: string;
  email: string;
  adres?: Adres;
  id?: number;
  bezorgwijzen: string[];
}
