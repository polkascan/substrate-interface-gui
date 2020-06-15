import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolkascanSignerAddressComponent } from './polkascan-signer-address.component';

describe('PolkascanSignerAddressComponent', () => {
  let component: PolkascanSignerAddressComponent;
  let fixture: ComponentFixture<PolkascanSignerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolkascanSignerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolkascanSignerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
