import { Injectable, Inject } from '@angular/core';
import { Entry } from '../models/entry.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class EntriesSerivce {
  public constructor(
    @Inject('API_BASE_URL') private baseUrl: string,
    private httpClient: HttpClient,
    private storage: Storage,
  ) { }

  public async getEntries(): Promise<Entry[]> {
    const url = this.baseUrl + '/api/entries';
    const headers = await this.getAuthorizationHeader();

    return this.httpClient.get<Entry[]>(url, headers).toPromise();
  }

  public async createEntry(entry: Entry): Promise<Entry> {
    const url = this.baseUrl + '/api/entries';
    const headers = await this.getAuthorizationHeader();

    return this.httpClient.post<Entry>(url, entry, headers).toPromise();
  }

  public async updateEntry(entry: Entry): Promise<Entry> {
    const url = this.baseUrl + '/api/entries';
    const headers = await this.getAuthorizationHeader();

    return this.httpClient.put<Entry>(url, entry, headers).toPromise();
  }

  public async deleteEntry(id: number): Promise<number> {
    const url = this.baseUrl + '/api/entries/' + id;
    const headers = await this.getAuthorizationHeader();

    return this.httpClient.delete<number>(url, headers).toPromise();
  }

  private async getAuthorizationHeader() {
    const token = await this.storage.get('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    const httpOptions = {
      headers: headers
    };

    return httpOptions;
  }
}
