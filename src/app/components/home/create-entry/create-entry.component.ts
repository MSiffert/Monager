import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Components } from '@ionic/core';
import { Entry, Category } from 'src/app/models/entry.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

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

  public onCancel = () => this.modal.dismiss('cancel');
  public onCreate() {
    const entry = new Entry();
    entry.Timestamp = <Date>this.formGroup.controls['date'].value;
    entry.Category = <Category>this.formGroup.controls['category'].value;
    entry.Price = <number>this.formGroup.controls['price'].value;

    console.log(entry);
  }
}
