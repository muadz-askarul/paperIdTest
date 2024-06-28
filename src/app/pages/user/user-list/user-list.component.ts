import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  catchError,
  debounce,
  debounceTime,
  map,
} from 'rxjs';
import { UserService } from '../../../service/user.service';
import { IUser } from '../../../model/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  subs: Subscription[] = [];
  users: IUser[] = [];
  filter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  displayedColumns: string[] = ['name', 'email', 'website', 'actions'];
  dataSource!: MatTableDataSource<IUser>;

  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService) {
    this.isLoadingResults = true;
    this.service
      .findAll()
      .pipe(
        catchError((err) => {
          console.error(err);
          return [];
        }),
        map((data) => {
          this.isLoadingResults = false;
          return data ?? [];
        })
      )
      .subscribe((users) => {
        this.users = users;
        this.updateUsers(users);
        console.log(this.users);
      });

    this.filter.pipe(debounceTime(500)).subscribe((value: string) => {
      this.dataSource.filter = value.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  updateFilter(event: Event) {
    this.filter.next((event.target as HTMLInputElement).value);
  }

  updateUsers(users: IUser[]) {
    this.dataSource.data = users;
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
