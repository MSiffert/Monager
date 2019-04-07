import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import { getEntriesState } from './../../store/selectors/state.selectors';
import { Entry } from 'src/app/models/entry.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { Months } from 'src/app/models/months.model';
import * as moment from 'moment';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import { ViewState } from 'src/app/store/entries.state';
import * as EntriesActions from './../../store/actions/entries.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public entries: Observable<Entry[]>;
  public expenditureMarco: Observable<string>;
  public expenditureChi: Observable<string>;
  public currentMonth: string;
  private viewState: Observable<ViewState>;

  constructor(
    private store: Store<AppState>, 
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.currentMonth = Months[moment().month()];
  }

  ngOnInit(): void {
    this.entries = this.store.select(getEntriesState).pipe(map(result => result.entries));
    this.viewState = this.store.select(getEntriesState).pipe(map(result => result.viewState));

    this.expenditureMarco = this.store.select(getEntriesState).pipe(map(result => {
      let sum = 0;
      result.entries.filter(e => e.userId === 1).forEach(e => sum += e.price);
      return (Math.ceil(sum * 20 - 0.5) / 20).toFixed(2);
    }));

    this.expenditureChi = this.store.select(getEntriesState).pipe(map(result => {
      let sum = 0;
      result.entries.filter(e => e.userId === 2).forEach(e => sum += e.price);
      return (Math.ceil(sum * 20 - 0.5) / 20).toFixed(2);
    }));
  }

  public async presentCreateModal() {
    const modal = await this.modalController.create({
      component: CreateEntryComponent
    });
    return await modal.present();
  }

  public async presentUpdateModal(entry: Entry) {
    const modal = await this.modalController.create({
      component: UpdateEntryComponent,
      componentProps: {
        entryToUpdate: entry
      }
    });
    return await modal.present();
  }

  public doRefresh(event) {
    this.store.dispatch(new EntriesActions.Fetch());

    this.viewState.pipe(take(2)).subscribe(async vs => {
      if (vs === ViewState.IsSilent) {
        event.target.complete();
      } else if (vs === ViewState.IsFaulted) {
        const toast = await this.toastController.create({
          message: 'Beim Laden ist ein Fehler aufgetreten.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        event.target.complete();
      }
    });
  }

  public getDateInSwissFormat(date: Date): string {
    return moment(date).format('MM.DD.YYYY');
  }

  public getCategoryInGerman(index: number) {
    if (index === 1) {
      return 'Benzin';
    }

    if (index === 2) {
      return 'Essen';
    }
  }

  public getCategoryIconName(index: number) {
    if (index === 1) {
      return 'battery-charging';
    }

    if (index === 2) {
      return 'pizza';
    }
  }
}
