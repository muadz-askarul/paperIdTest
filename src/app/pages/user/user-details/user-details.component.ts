import { Component, Sanitizer } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IGeo, IKeyValue, IUser } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import { catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  user!: IUser | null;
  dataSource: MatTableDataSource<IKeyValue> = new MatTableDataSource();
  isLoadingResults = false;

  geoMap!: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.activatedRoute.params.subscribe(({ userId }) => {
      this.findUserById(userId);
    });
  }

  findUserById(userId: string) {
    this.isLoadingResults = true;
    this.service
      .findById(userId)
      .pipe(
        catchError((err) => {
          console.error(err);
          return [];
        }),
        map((data) => {
          this.isLoadingResults = false;
          return data ?? null;
        })
      )
      .subscribe((user) => {
        this.user = user;
        const { street, suite, city, zipcode } = user?.address;
        const data = {
          // name: user?.name,
          email: user?.email,
          website: user?.website,
          phone: user?.phone,
          address: `${street}, ${suite}, ${city}, ${zipcode}`,
          company: user?.company.name,
        };
        this.dataSource.data = Object.entries(data).map(([key, value]) => ({
          key,
          value,
        }));

        console.log(
          Object.entries(user).map(([key, value]) => ({
            key,
            value,
          }))
        );
      });
  }
}
