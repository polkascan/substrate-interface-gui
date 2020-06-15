import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolkascanSignerSignatureComponent } from './polkascan-signer-signature.component';

describe('PolkascanSignerSignatureComponent', () => {
  let component: PolkascanSignerSignatureComponent;
  let fixture: ComponentFixture<PolkascanSignerSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolkascanSignerSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolkascanSignerSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
