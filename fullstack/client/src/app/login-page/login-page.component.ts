import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../shared/services/auth.service';
import { User } from '../shared/services/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        // Validators.email,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        // Can login
        MaterialService.toast('Can login');
      } else if (params.accessDenied) {
        // Can not login
        MaterialService.toast('Can not login');
      } else if (params.sessionFailed) {
        // Can not login

        MaterialService.toast('SessionFailed');
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        // this.router.navigate(['/admin', 'dashboard']);     // напрввлние на компонент
      },
      ({ error }) => {
        MaterialService.toast(error.message);
        this.form.enable();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
