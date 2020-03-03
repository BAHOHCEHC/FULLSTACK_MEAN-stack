import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const currentToken = localStorage.getItem('auth-token');
    if (currentToken !== null) {
      this.auth.setToken(currentToken);
    }
  }
}