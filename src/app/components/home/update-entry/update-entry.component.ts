import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from 'src/app/models/entry.model';
import { NavParams, AlertController } from '@ionic/angular';
import { Components } from '@ionic/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as EntriesActions from './../../../store/actions/entries.actions';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss'],
})
export class UpdateEntryComponent implements OnInit {

  @Input() modal: Components.IonModal;
  public entryToUpdate: Entry;
  public formGroup: FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder, 
    private navParams: NavParams, 
    private store: Store<AppState>,
    public alertController: AlertController
  ) {
    this.entryToUpdate = navParams.data.entryToUpdate;
  }

  ngOnInit() {}

  public onCancel() {
    this.modal.dismiss('cancel');
  }

  public onUpdate() {
    this.entryToUpdate.timestamp = <Date>this.formGroup.controls['date'].value;
    this.entryToUpdate.category = <Category>this.formGroup.controls['category'].value;
    this.entryToUpdate.price = <number>this.formGroup.controls['price'].value;
    this.entryToUpdate.userId = 1;

    this.store.dispatch(new EntriesActions.Update(this.entryToUpdate));
  }

  public async onDelete() {
    const alert = await this.alertController.create({
      header: 'Achtung!',
      message: 'Eintrag wirklich löschen?',
      buttons: [ 
        {
          text: 'Nein',
          role: 'cancel'
        },
        {
          text: 'Ja',
          role: 'cancel',
          handler: () => {
            this.store.dispatch(new EntriesActions.Delete(this.entryToUpdate.id));
          }
        }
      ]
    });

    await alert.present();
  }
}
