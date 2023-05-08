import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRestoreComponent } from './board-restore.component';

describe('BoardRestoreComponent', () => {
  let component: BoardRestoreComponent;
  let fixture: ComponentFixture<BoardRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardRestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
