import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListingComponent } from './person-listing.component';

describe('PersonListingComponent', () => {
  let component: PersonListingComponent;
  let fixture: ComponentFixture<PersonListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonListingComponent]
    });
    fixture = TestBed.createComponent(PersonListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
