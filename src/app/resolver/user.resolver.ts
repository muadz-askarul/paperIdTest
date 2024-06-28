import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser | null> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser | null> {
    const userId = route.params['userId'];
    if (userId) {
      return this.service.findById(userId);
    }
    return of(null);
  }
}
