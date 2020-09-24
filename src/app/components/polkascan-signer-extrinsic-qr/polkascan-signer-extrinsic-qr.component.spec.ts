import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolkascanSignerExtrinsicQRComponent } from './polkascan-signer-extrinsic-qr.component';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {BehaviorSubject, Observable} from 'rxjs';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

describe('PolkascanSignerExtrinsicQRComponent', () => {
  let component: PolkascanSignerExtrinsicQRComponent;
  let fixture: ComponentFixture<PolkascanSignerExtrinsicQRComponent>;
  const currentAccount = new BehaviorSubject<SubstrateAccount>(null);
  const payload = new BehaviorSubject<string>(null);

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
    account.ss58Address = 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk';
    account.genesisHash = '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe';
    account.name = 'test';
    account.publicKey = account.decodeAddress();

    currentAccount.next(account);
    component.account = currentAccount.asObservable();

    payload.next('0x01');
    component.payload = payload.asObservable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('qr', component.qrcode);
  });

  it('should generate a QR code', async(() => {
    // async() knows about all the pending promises defined in it's function body.
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        // This is called when ALL pending promises have been resolved
        fixture.detectChanges();
        expect(component.qrcode).not.toBeNull();
    });

    component.ngOnInit();
  }));
});
