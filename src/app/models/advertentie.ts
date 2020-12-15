export interface Advertentie{
  id?: number;
  titel: string;
  omschrijving?: string;
  prijs: number;
  soort: string;
  bezorgwijzeLijst?: string[];
}
