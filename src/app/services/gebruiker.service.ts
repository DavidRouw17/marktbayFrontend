import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {Gebruiker} from '../models/gebruikers';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Inlogpoging} from '../models/inlogpoging';
import {Advertentie} from '../models/advertentie';
import {GebruikerDto} from '../models/gebruikerDto';
import {AdvertentieDto} from '../models/advertentieDto';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  private url = 'http://localhost:9080/mb/app/gebruikers';

  gebruikersUpdated$ = new Subject<Gebruiker[]>();

  actieveGebruiker$ = new Subject<GebruikerDto>();

  gebruikerAdvertenties$ = new Subject<AdvertentieDto[]>();

  actieveGebruiker: GebruikerDto;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll(): Observable<Gebruiker[]> {
    this.http.get<Gebruiker[]>(this.url)
      .subscribe(
        gebruikers => this.gebruikersUpdated$.next(gebruikers)
      );

    return this.gebruikersUpdated$;
  }

  getByQuery(query: string): Observable<Gebruiker[]> {
    this.http.get<Gebruiker[]>(`${this.url}?q=${query}`)
      .subscribe(
        contacts => this.gebruikersUpdated$.next(contacts)
      );

    return this.gebruikersUpdated$;
  }

  addGebruiker(newGebruiker: Gebruiker): void {
    this.http.post<Gebruiker[]>(this.url, newGebruiker)
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  deleteGebruiker(c: Gebruiker): void {
    this.http.delete<Gebruiker>(this.url.toString() + '/' + c.id.toString())
      .subscribe();
  }

  updateGebruiker(c: Gebruiker): void {
    this.http.put<Gebruiker>(`${this.url}/${this.actieveGebruiker.id}`, c)
      .subscribe();
  }

  logIn(i: Inlogpoging): Observable<GebruikerDto> {
    this.http.post<GebruikerDto>(this.url.toString() + '/login', i)
      .pipe(catchError(this.handleError))
      .subscribe(
        gebruiker => {
          this.actieveGebruiker = gebruiker;
          this.router.navigateByUrl('/advertenties');
          alert(`Welkom ${gebruiker.voornaam}`);
        }
      );

    return this.actieveGebruiker$;
  }

  addAdvertentie(a: Advertentie): void {
    console.log(a);
    this.http.post<Gebruiker>(this.url.toString() + '/' + this.actieveGebruiker.id + '/advertenties', a)
      .subscribe();
  }

  getAdvertentieGebruiker(): Observable<AdvertentieDto[]> {

    this.http.get<AdvertentieDto[]>(this.url.toString() + '/' + this.actieveGebruiker.id + '/advertenties')
      .subscribe(inhoud => this.gebruikerAdvertenties$.next(inhoud)
      );


    return this.gebruikerAdvertenties$;
  }

  verwijderAdvertentie(a: AdvertentieDto): void {
    this.http.delete<AdvertentieDto>(this.url.toString() + '/' + this.actieveGebruiker.id + '/advertenties/' + a.id)
      .subscribe();
  }

  // tslint:disable-next-line:typedef
  handleError(response: HttpErrorResponse) {
    alert(response.error);
    return throwError(response);
  }
}
