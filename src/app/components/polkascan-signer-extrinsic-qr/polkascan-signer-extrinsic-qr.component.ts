import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import QRCode from 'qrcode';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-polkascan-signer-extrinsic-qr',
  templateUrl: './polkascan-signer-extrinsic-qr.component.html',
  styleUrls: ['./polkascan-signer-extrinsic-qr.component.scss']
})
export class PolkascanSignerExtrinsicQRComponent implements OnInit, OnDestroy {

  @Input() account: Observable<SubstrateAccount>;
  @Input() payload: Observable<string>;
  public qrcode: string;

  public currentAccount: SubstrateAccount;
  public currentPayload: string;

  private accountSubscription: Subscription;
  private payloadSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.account) {
      this.accountSubscription = this.account.subscribe(account => {

        this.currentAccount = account;

        if (this.currentAccount && this.currentPayload) {
          this.generateQR(this.currentAccount, this.currentPayload).then(value => {
            console.log('QR generated');
          });
        }
      });
    }
    if (this.payload) {
      this.payloadSubscription = this.payload.subscribe(payload => {

        this.currentPayload = payload;

        if (this.currentAccount && this.currentPayload) {
          this.generateQR(this.currentAccount, this.currentPayload).then(value => {
            console.log('QR generated');
          });
        }
      });
    }
  }

  async generateQR(account: SubstrateAccount, hexPayload: string): Promise<boolean> {

    const framePayload = '00' + // multipart
        '0001' + // length
        '0000' + // index
        '530102' + // payload info, substrate + sr25519 + signtx
        account.publicKey.replace('0x', '') +
        hexPayload.replace('0x', '') +
        account.genesisHash.replace('0x', '');

    console.log('QR payload', framePayload);

    try {
      // @ts-ignore
      this.qrcode = await QRCode.toDataURL( [{ data: this.fromHexString(framePayload), mode: 'byte' }]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  fromHexString(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  }

  encodeString(value: string): Uint8Array {
    const u8a = new Uint8Array(value.length);

    for (let i = 0; i < value.length; i++) {
      u8a[i] = value.charCodeAt(i);
    }

    return u8a;
  }

  encodeNumber(value: number): Uint8Array {
    // tslint:disable-next-line:no-bitwise
    return new Uint8Array([value >> 8, value & 0xff]);
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    this.accountSubscription.unsubscribe();
    this.payloadSubscription.unsubscribe();
  }
}
