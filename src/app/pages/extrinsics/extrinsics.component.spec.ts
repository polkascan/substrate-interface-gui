import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrinsicsComponent } from './extrinsics.component';

describe('ExtrinsicsComponent', () => {
  let component: ExtrinsicsComponent;
  let fixture: ComponentFixture<ExtrinsicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrinsicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrinsicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
