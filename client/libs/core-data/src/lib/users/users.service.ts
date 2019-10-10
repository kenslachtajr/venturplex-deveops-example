import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users.model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';
const model = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.getForUrl());
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.getForUrl(), user);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(this.getForUrlId(user.id), user);
  }

  delete(userId: number): any {
    return this.http.delete<any>(this.getForUrlId(userId));
  }

  private getForUrl() {
    return `${BASE_URL}${model}`;
  }

  private getForUrlId(id: number) {
    return `${this.getForUrl()}/${id}`;
  }
}
