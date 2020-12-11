import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AdvertentieDto} from '../models/advertentieDto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertentieService {
  private url = 'http://localhost:9080/mb/app/advertenties';

  advertentiesUpdated$ = new Subject<AdvertentieDto[]>();

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<AdvertentieDto[]> {
    this.http.get<AdvertentieDto[]>(this.url)
      .subscribe(advertenties => this.advertentiesUpdated$.next(advertenties)
      );

    return this.advertentiesUpdated$;
  }

  getByQuery(query: string): Observable<AdvertentieDto[]> {
    this.http.get<AdvertentieDto[]>(`${this.url}?q=${query}`)
      .subscribe(advertenties => this.advertentiesUpdated$.next(advertenties)
      );

    return this.advertentiesUpdated$;
  }
}
