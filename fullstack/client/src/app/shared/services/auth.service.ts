import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }
  setToken(token: string) {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }
  logout() {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }
}
