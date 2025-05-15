import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // endpoint backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
  return this.http.get<any[]>(`http://localhost:3000/users?email=${email}&password=${password}`);
}

  register(data: any) {
  return this.http.post('http://localhost:3000/users', data);
}
}
