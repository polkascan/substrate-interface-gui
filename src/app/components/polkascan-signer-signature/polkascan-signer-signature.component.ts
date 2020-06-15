import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {throwError} from "rxjs";

@Component({
  selector: 'app-polkascan-signer-signature',
  templateUrl: './polkascan-signer-signature.component.html',
  styleUrls: ['./polkascan-signer-signature.component.scss']
})
export class PolkascanSignerSignatureComponent implements OnInit {

  hasDevices: boolean;
  hasPermission: boolean;

  scannerActive: boolean;

  @Input() device: MediaDeviceInfo = null;
  @Output() signatureScanned: EventEmitter<string> = new EventEmitter();
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
    this.signatureScanned.emit('0x' + resultString);
  }
}
