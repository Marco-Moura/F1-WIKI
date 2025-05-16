import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  msg: string;
  fullname?: string;
  email?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Ajuste a URL conforme a API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  signup(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { fullname, email, password });
  }
}
