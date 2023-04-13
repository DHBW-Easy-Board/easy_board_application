import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBoardComponent } from './save-board.component';

describe('SaveBoardComponent', () => {
  let component: SaveBoardComponent;
  let fixture: ComponentFixture<SaveBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SaveBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
