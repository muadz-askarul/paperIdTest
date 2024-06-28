import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',

})
export class UserService {
  private baseurl = `${environment.resourceUrl}/users`;
  constructor(private http: HttpClient) {}
  findAll() {
    return this.http.get<IUser[]>(this.baseurl);
  }
  findById(id: string) {
    return this.http.get<IUser>(`${this.baseurl}/${id}`);
  }
}
