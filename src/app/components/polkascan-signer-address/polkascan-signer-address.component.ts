import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {throwError} from "rxjs";

@Component({
  selector: 'app-polkascan-signer-address',
  templateUrl: './polkascan-signer-address.component.html',
  styleUrls: ['./polkascan-signer-address.component.scss']
})
export class PolkascanSignerAddressComponent implements OnInit {

  hasDevices: boolean;
  hasPermission: boolean;

  scannerActive: boolean;

  @Input() device: MediaDeviceInfo = null;
  @Output() accountScanned: EventEmitter<SubstrateAccount> = new EventEmitter();
  @Output() camerasFound: EventEmitter<MediaDeviceInfo[]> = new EventEmitter();

  constructor() { }


  ngOnInit() {
    this.device = null;
    this.scannerActive = false;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = true;
    this.camerasFound.emit(devices);
  }

  onCamerasNotFound(): void {
    this.hasDevices = false;
  }

  onScanResult(resultString: string) {
    const resultParts = resultString.split(':', 4);

    if (resultParts[0] === 'substrate') {
      const account = new SubstrateAccount();
      account.ss58Address = resultParts[1];
      account.genesisHash = resultParts[2];
      account.name = resultParts[3];
      account.publicKey = account.decodeAddress();

      this.accountScanned.emit(account);
    } else {
      throw new Error('Scanned QR code does not contain a Substrate address');
    }
  }
}
