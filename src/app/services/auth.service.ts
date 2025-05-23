// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  msg: string;
  fullname?: string;
  email?: string;
  error?: string;
}

export interface User {
  fullname: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://f1-wiki-backend.onrender.com';

  // começa com null; vamos povoar no construtor se for browser
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // guarda se estamos no browser
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // só lê do storage se estivermos no browser
    if (this.isBrowser) {
      const stored = this.readUserFromStorage();
      this.currentUserSubject.next(stored);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (!response.error && response.fullname && this.isBrowser) {
            const user: User = { fullname: response.fullname, email: response.email! };
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  signup(fullname: string, email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signup`, { fullname, email, password });
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  private readUserFromStorage(): User | null {
    try {
      const json = localStorage.getItem('user');
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }
}
