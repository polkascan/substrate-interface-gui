import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolkascanSignerExtrinsicQRComponent } from './polkascan-signer-extrinsic-qr.component';

describe('PolkascanSignerExtrinsicQRComponent', () => {
  let component: PolkascanSignerExtrinsicQRComponent;
  let fixture: ComponentFixture<PolkascanSignerExtrinsicQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolkascanSignerExtrinsicQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolkascanSignerExtrinsicQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
