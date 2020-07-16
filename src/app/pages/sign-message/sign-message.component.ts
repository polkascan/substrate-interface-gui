import {Component, Inject, OnInit} from '@angular/core';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {BehaviorSubject, Observable} from 'rxjs';
import {SubstrateApiService} from '../../services/substrate-api.service';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Component({
  selector: 'app-sign-message',
  templateUrl: './sign-message.component.html',
  styleUrls: ['./sign-message.component.scss']
})
export class SignMessageComponent implements OnInit {

  public errorMessage: string;
  public message: string;
  public signature: string;

  public enableAddressScanner = false;
  public enableSignatureScanner = false;

  public scanDevices: MediaDeviceInfo[];
  public currentDevice: MediaDeviceInfo = null;

  public currentAccount: SubstrateAccount;
  public currentAccount$: Observable<SubstrateAccount>;

  public payload = new BehaviorSubject<string>(null);

  constructor(
    private substrateApiService: SubstrateApiService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  ngOnInit() {
    this.currentAccount$ = this.substrateApiService.getAccount();
  }

  startScanning() {
    this.enableAddressScanner = true;
  }

  cancelScanning() {
    this.currentDevice = null;
    this.enableAddressScanner = false;
    this.enableSignatureScanner = false;
  }

  onAddressScanned(account: SubstrateAccount) {

    this.cancelScanning();

    if (account.genesisHash === '') {
      account.genesisHash = this.substrateApiService.genesisHash;
    }

    console.log('account scanned', account);

    if (account.genesisHash === this.substrateApiService.genesisHash) {
     this.substrateApiService.setAccount(account);
     this.storage.set('account', account);
    } else {
      this.errorMessage = 'Genesis hash of scanned account doesn\'t match genesis hash of node';
    }
  }
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('devices found', devices);
    this.scanDevices = devices;
    this.currentDevice = this.scanDevices[this.scanDevices.length - 1];
  }

  cancelQRcode() {
    this.payload.next(null);
  }

  scanSignature() {
    this.payload.next(null);
    this.enableSignatureScanner = true;
  }

  onSignatureScanned(signature: string) {
    console.log('signature', '0x' + signature.substr(4));
    this.currentDevice = null;
    this.cancelScanning();

    this.errorMessage = '';

    this.signature = '0x' + signature.substr(4);
  }

  signMessage() {

    // Scale encode message
    this.substrateApiService.executeRPCRequest('runtime_encodeScale', ['Bytes', this.message]).subscribe(data => {

      console.log('SCALE', data.result);

      this.payload.next(data.result);

      if (data.error) {
        this.errorMessage = 'RPC Error: ' + data.error.message;
      }
    }, error => {
      this.errorMessage = 'RPC error: ' + error.statusText;
    });
  }
}
