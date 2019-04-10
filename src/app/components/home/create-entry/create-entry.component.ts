import { Component, OnInit, Input } from '@angular/core';
import { Components } from '@ionic/core';
import { Entry } from 'src/app/models/entry.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { AppState } from 'src/app/app.state';
import * as EntriesActions from './../../../store/actions/entries.actions';
import { Category } from 'src/app/models/category.model';
import { getEntriesState } from 'src/app/store/selectors/state.selectors';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ViewState } from 'src/app/store/entries.state';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent implements OnInit {

  @Input() modal: Components.IonModal;
  public viewState: Observable<ViewState>;
  public formGroup: FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    info: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public toastController: ToastController
  ) {
    this.formGroup.controls['date'].setValue(new Date());
  }

  ngOnInit() {
    this.viewState = this.store.select(getEntriesState).pipe(map(result => result.viewState));
  }

  public onCancel() {
    this.modal.dismiss('cancel');
  }

  public async onCreate() {
    const entry = this.createEntryFromCurrentFormValues();
    this.store.dispatch(new EntriesActions.Create(entry));

    this.viewState.pipe(take(2)).subscribe(async vs => {
      if (vs === ViewState.IsSilent) {
        this.onCancel();
      } else if (vs === ViewState.IsFaulted) {
        const toast = await this.toastController.create({
          message: 'Beim Speichern ist ein Fehler aufgetreten.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  private createEntryFromCurrentFormValues(): Entry {
    const entry = new Entry();
    entry.timestamp = <Date>this.formGroup.controls['date'].value;
    entry.category = <Category>this.formGroup.controls['category'].value;
    entry.price = <number>this.formGroup.controls['price'].value;
    entry.info = <string>this.formGroup.controls['info'].value;

    return entry;
  }
}
