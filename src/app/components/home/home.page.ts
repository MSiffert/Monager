import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import { getEntriesState } from './../../store/selectors/state.selectors';
import { Entry } from 'src/app/models/entry.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CreateEntryComponent } from './create-entry/create-entry.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public entries: Observable<Entry[]>;

  constructor(private store: Store<AppState>, private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.entries = this.store.select(getEntriesState).pipe(map(result => result.entries));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateEntryComponent
    });
    return await modal.present();
  }

  public doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
