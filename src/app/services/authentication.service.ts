// src/app/auth/auth-guard.service.ts
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { Token } from '../models/token.model';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthenticationService implements CanActivate {

  constructor(
    @Inject('API_BASE_URL') private baseUrl: string,
    public router: Router,
    private httpClient: HttpClient,
    private storage: Storage
  ) {
  }

  public async canActivate(): Promise<boolean> {
    if (!await this.isAuthenticated()) {

    this.router.navigate(['/authenticate/login']);
      return false;
    }

    return true;
  }

  public async isAuthenticated(): Promise<boolean> {
    const loginKey = await this.storage.get('loginKey');
    if (loginKey != null) {
      await this.authenticate(loginKey);
      return true;
    }

    return false;
  }

  public authenticate(loginKey: string) {
    const credentials = new Credentials();
    credentials.key = loginKey;
    const url = this.baseUrl + '/api/authenticate';
    return this.httpClient.post<Token>(url, credentials);
  }

  public async logout() {
    await this.storage.clear();
  }
}

