import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpcCallsComponent } from './rpc-calls.component';

describe('RpcCallsComponent', () => {
  let component: RpcCallsComponent;
  let fixture: ComponentFixture<RpcCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpcCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpcCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
