import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { By } from '@angular/platform-browser';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render spinner`, () => {
    fixture.detectChanges();

    component.isLoadingResults = true;

    const loadingSpinner = fixture.debugElement.query(By.css('[data-testid]="loading-view"'))

    expect(loadingSpinner).toBeTruthy();
  });

  it(`should NOT render spinner`, () => {
    fixture.detectChanges();

    component.isLoadingResults = false;

    const loadingSpinner = fixture.debugElement.query(By.css('[data-testid]="loading-view"'))

    expect(loadingSpinner).toBeFalsy();
  });

});
