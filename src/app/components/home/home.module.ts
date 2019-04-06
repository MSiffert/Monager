import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { UpdateEntryComponent } from './update-entry/update-entry.component';

@NgModule({
  entryComponents: [
    CreateEntryComponent,
    UpdateEntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    CreateEntryComponent,
    UpdateEntryComponent
  ]
})
export class HomePageModule {}
