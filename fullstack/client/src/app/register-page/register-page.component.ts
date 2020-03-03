import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
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

    this.aSub = this.auth.register(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate([
          "/login",
          {
            queryParams: {
              registered: true
            }
          }
        ]); // напрввлние на компонент
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
