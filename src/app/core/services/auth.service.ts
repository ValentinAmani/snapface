import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { host } from './host.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'TOKEN';
  isLogged$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  setToken(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeToken(key: string): void {
    localStorage.removeItem(key);
  }

  login(formValue: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${host}/auth/login`, formValue).pipe(
      tap((res) => {
        const tokenFind = this.getToken(this.tokenKey);
        if (!tokenFind) {
          this.setToken(this.tokenKey, res.token);
        }
        this.isLogged$.next(true);
      })
    );
  }

  signup(formValue: {
    userName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${host}/auth/signup`, formValue).pipe(
      tap((res) => {
        this.setToken(this.tokenKey, res.token);
        this.isLogged$.next(true);
      })
    );
  }

  logout() {
    this.removeToken(this.tokenKey);
    this.isLogged$.next(false);
  }
}
