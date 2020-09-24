import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolkascanSignerExtrinsicQRComponent } from './polkascan-signer-extrinsic-qr.component';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {BehaviorSubject, Observable} from 'rxjs';
import {ZXingScannerModule} from "@zxing/ngx-scanner";

describe('PolkascanSignerExtrinsicQRComponent', () => {
  let component: PolkascanSignerExtrinsicQRComponent;
  let fixture: ComponentFixture<PolkascanSignerExtrinsicQRComponent>;
  const currentAccount = new BehaviorSubject<SubstrateAccount>(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolkascanSignerExtrinsicQRComponent ],
      imports: [ZXingScannerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolkascanSignerExtrinsicQRComponent);
    component = fixture.componentInstance;


    const account = new SubstrateAccount();
    account.ss58Address = '5Dadasd';
    account.genesisHash = '0x313123';
    account.name = 'test';
    account.publicKey = account.decodeAddress();

    currentAccount.next(account);
    component.account = currentAccount.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component.qrcode);
  });
});
