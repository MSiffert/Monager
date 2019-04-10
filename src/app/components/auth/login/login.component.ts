import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public isAuthenticating: boolean;
  public formGroup: FormGroup = this.formBuilder.group({
    key: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authenticationService: AuthenticationService, 
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  public async authenticate() {
    try {
      this.isAuthenticating = true;
      const key = this.formGroup.controls['key'].value;

      const result = await this.authenticationService.authenticate(key).toPromise();

      this.storage.set('token', result.bearerToken);
      this.storage.set('loginKey', key);

      this.isAuthenticating = false;
      this.router.navigate(['..']);
    } catch (error) {
      this.isAuthenticating = false;
    }
  }
}
