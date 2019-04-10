import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import * as EntriesActions from './../store/actions/entries.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<AppState>,
    public router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.fetchInitialEntries();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  fetchInitialEntries() {
    this.store.dispatch(new EntriesActions.Fetch());
  }

  public async logout() {
    console.log('logout');
    await this.authenticationService.logout();
    await this.router.navigate(['../login/'], {relativeTo: this.activatedRoute});
  }
}
