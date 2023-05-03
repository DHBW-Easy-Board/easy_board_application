import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardImageComponent } from './board-image.component';

describe('BoardImageComponent', () => {
  let component: BoardImageComponent;
  let fixture: ComponentFixture<BoardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
