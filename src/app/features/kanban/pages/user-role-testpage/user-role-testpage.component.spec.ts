import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleTestpageComponent } from './user-role-testpage.component';

describe('UserRoleTestpageComponent', () => {
  let component: UserRoleTestpageComponent;
  let fixture: ComponentFixture<UserRoleTestpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleTestpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleTestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
