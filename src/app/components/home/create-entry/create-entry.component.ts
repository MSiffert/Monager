import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Components } from '@ionic/core';
import { Entry } from 'src/app/models/entry.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import * as EntriesActions from './../../../store/actions/entries.actions';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
})
export class CreateEntryComponent implements OnInit {

  @Input() modal: Components.IonModal;
  public formGroup: FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {}

  public onCancel() {
    this.modal.dismiss('cancel');
  }

  public onCreate() {
    const entry = this.createEntryFromCurrentFormValues();
    this.store.dispatch(new EntriesActions.Create(entry));
  }

  private createEntryFromCurrentFormValues(): Entry {
    const entry = new Entry();
    entry.timestamp = <Date>this.formGroup.controls['date'].value;
    entry.category = <Category>this.formGroup.controls['category'].value;
    entry.price = <number>this.formGroup.controls['price'].value;
    entry.userId = 1;

    return entry;
  }
}
