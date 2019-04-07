import { Injectable } from '@angular/core';
import { Entry } from '../models/entry.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class EntriesSerivce {
  private baseUrl = 'https://monager-api.azurewebsites.net';

  public constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  public getEntries(): Observable<Entry[]> {
    const url = this.baseUrl + '/api/entries';
    const headers = this.getAuthorizationHeader();

    return this.httpClient.get<Entry[]>(url, { headers: headers });
  }

  public createEntry(entry: Entry): Observable<Entry> {
    const url = this.baseUrl + '/api/entries';
    return this.httpClient.post<Entry>(url, entry);
  }

  public updateEntry(entry: Entry): Observable<Entry> {
    const url = this.baseUrl + '/api/entries';
    return this.httpClient.put<Entry>(url, entry);
  }

  public deleteEntry(id: number): Observable<number> {
    const url = this.baseUrl + '/api/entries/' + id;
    const headers = this.getAuthorizationHeader();

    return this.httpClient.delete<number>(url, {
      headers: headers
   });
  }

  private getAuthorizationHeader() {
    const token = this.storage.get('token');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return headers;
  }
}
