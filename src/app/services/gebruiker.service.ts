import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {Gebruiker} from '../models/gebruikers';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Inlogpoging} from '../models/inlogpoging';
import {Advertentie} from '../models/advertentie';
import {GebruikerDto} from '../models/gebruikerDto';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  private url = 'http://localhost:9080/mb/app/gebruikers';

  gebruikersUpdated$ = new Subject<Gebruiker[]>();

  actieveGebruiker$ = new Subject<GebruikerDto>();

  actieveGebruiker: GebruikerDto;

  constructor(private http: HttpClient) {
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
    this.http.put<Gebruiker>(`${this.url}/${c.id}`, c)
      .subscribe();
  }

  logIn(i: Inlogpoging): Observable<GebruikerDto> {
    this.http.post<GebruikerDto>(this.url.toString() + '/login', i)
      .pipe(catchError(this.handleError))
      .subscribe(
        gebruiker => this.actieveGebruiker = gebruiker
      );
    return this.actieveGebruiker$;
  }

  addAdvertentie(a: Advertentie): void {
    this.http.post<Gebruiker>(this.url.toString() + '/' + this.actieveGebruiker.id + '/advertenties', a)
      .subscribe();
  }

  // tslint:disable-next-line:typedef
  handleError(response: HttpErrorResponse) {
    alert(response.error);
    return throwError(response);
  }
}
