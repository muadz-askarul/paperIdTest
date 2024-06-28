import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render spinner`, () => {
    fixture.detectChanges();

    component.isLoadingResults = true;

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid]="loading-view"')
    );

    expect(loadingSpinner).toBeTruthy();
  });

  it(`should NOT render spinner`, () => {
    fixture.detectChanges();

    component.isLoadingResults = false;

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid]="loading-view"')
    );

    expect(loadingSpinner).toBeFalsy();
  });
});
