export interface AdvertentieDto {
  id: number;
  titel: string;
  soort: string;
  prijs: number;
  omschrijving: string;
  gebruikerVoornaam: string;
  gebruikerAchternaam: string;
  bezorgwijzeLijst: string[];
}
