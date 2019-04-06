import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.scss'],
})
export class UpdateEntryComponent implements OnInit {

  @Input() entry: Observable<Entry>;

  constructor() { }

  ngOnInit() {}

}
