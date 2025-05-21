import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  msg: string;
  fullname?: string;
  email?: string;
  error?: string;
}

interface User {
  fullname: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://f1-wiki-backend.onrender.com';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  signup(fullname: string, email: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.baseUrl}/signup`, {
    fullname,
    email,
    password
  });
}
}
