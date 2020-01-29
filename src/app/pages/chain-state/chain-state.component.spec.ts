import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainStateComponent } from './chain-state.component';

describe('ChainStateComponent', () => {
  let component: ChainStateComponent;
  let fixture: ComponentFixture<ChainStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
