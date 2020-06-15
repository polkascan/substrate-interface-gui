/*
 * Polkascan Substrate Interface GUI
 *
 * Copyright 2018-2020 openAware BV (NL).
 * This file is part of Polkascan.
 *
 * Polkascan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Polkascan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Polkascan. If not, see <http://www.gnu.org/licenses/>.
 *
 * extrinsics.component.ts
 *
 */

import {Component, Inject, OnInit} from '@angular/core';
import {RpcRequestParam} from '../../classes/param.class';
import {SubstrateApiService} from '../../services/substrate-api.service';
import {isNumeric} from 'rxjs/internal-compatibility';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-extrinsics',
  templateUrl: './extrinsics.component.html',
  styleUrls: ['./extrinsics.component.scss']
})
export class ExtrinsicsComponent implements OnInit {

  public callFunctions = [];
  public selectedCallFunction;

  public result: string;
  public extrinsicHash: string;
  public errorMessage: string;

  public rpcParams: RpcRequestParam[] = [];

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

    this.extrinsicHash = null;
    this.errorMessage = null;

    this.currentAccount$ = this.substrateApiService.getAccount();

    this.substrateApiService.getAccount().subscribe(account => this.currentAccount = account);

    this.substrateApiService.executeRPCRequest('runtime_getMetadataCallFunctions').subscribe(data => {
      this.callFunctions = data.result;
      this.selectedCallFunction = this.callFunctions[0];
      this.updateParamFields();
    });
  }

  updateParamFields() {
     this.rpcParams = [];

     for (const arg of this.selectedCallFunction.call_args) {
       this.rpcParams.push({type: arg.type, name: arg.name, value: null});
     }
  }

  updateParamValue(event, param) {

    if (event.target.value.startsWith('{') || event.target.value.startsWith('[')) {
      try {
        param.value = JSON.parse(event.target.value);
      } catch (e) {
        alert('Invalid JSON in field ' + event.target.name);
      }
    } else {
      param.value = event.target.value;
    }
  }

  selectCallFunction(e) {
    this.result = null;
    this.updateParamFields();
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

    console.log('result scanned', account.ss58Address);

    this.cancelScanning();

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
    this.currentDevice = this.scanDevices[0];
  }

  getCallParams() {
    const params = {};

    for (const param of this.rpcParams) {

      if (param.type !== 'Bytes' && (param.type === 'numeric' ||  isNumeric(param.value))) {
         if (!param.value) {
           params[param.name] = null;
         } else {
           params[param.name] = +param.value;
         }
       } else {

         if (!param.value) {
           params[param.name] = null;
         } else {
           params[param.name] = param.value;
         }
       }
    }
    return params;
  }

  requestSignaturePayload() {
    this.errorMessage = '';

    this.substrateApiService.executeRPCRequest(
      'runtime_createSignaturePayload',
      [
        this.currentAccount.ss58Address,
        this.selectedCallFunction.module_name,
        this.selectedCallFunction.call_name,
        this.getCallParams()
      ]
    ).subscribe(data => {
      if (data.result) {
        this.result = data.result || '<no result>';
        this.payload.next(data.result);
      }

      if (data.error) {
        this.errorMessage = data.error.message;
      }
    }, error => {
      this.errorMessage = 'RPC error: ' + error.statusText;
    });
  }

  cancelQRcode() {
    this.result = null;
  }

  scanSignature() {
    this.result = null;
    this.enableSignatureScanner = true;
  }

  onSignatureScanned(signature: string) {
    console.log('signature', signature);
    this.currentDevice = null;
    this.cancelScanning();

    this.errorMessage = '';

    this.substrateApiService.executeRPCRequest(
      'runtime_submitExtrinsic',
      [
        this.currentAccount.ss58Address,
        this.selectedCallFunction.module_name,
        this.selectedCallFunction.call_name,
        this.getCallParams(),
        signature
      ]
    ).subscribe(data => {
      console.log('submitResult', data);
      if (data.result) {
        this.extrinsicHash = data.result.extrinsic_hash;
      } else {
        this.errorMessage = data.error ? data.error.message : 'An unknown error occured';
      }
    }, error => {
      this.errorMessage = 'RPC error: ' + error.statusText;
    });
  }
}
