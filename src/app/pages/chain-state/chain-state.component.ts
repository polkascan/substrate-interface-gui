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
 * chain-state.component.ts
 *
 */

import { Component, OnInit } from '@angular/core';
import {RpcRequestParam} from '../../classes/param.class';
import {SubstrateApiService} from '../../services/substrate-api.service';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-chain-state',
  templateUrl: './chain-state.component.html',
  styleUrls: ['./chain-state.component.scss']
})
export class ChainStateComponent implements OnInit {

  public storageFunctions = [];
  public selectedStorageFunction;
  public selectedBlockHashOrId = null;
  public result: string;
  public rpcParams: RpcRequestParam[] = [];

  constructor(private substrateApiService: SubstrateApiService) { }

  ngOnInit() {
    this.substrateApiService.executeRPCRequest('runtime_getMetadataStorageFunctions').subscribe(data => {
      this.storageFunctions = data.result;
      this.selectedStorageFunction = this.storageFunctions[0];
      this.updateParamFields();
    });
  }

  updateParamValue(event, param) {
    param.value = JSON.parse(event.target.value);
  }

  updateParamFields() {
     this.rpcParams = [];

     let value = null;

     if (this.selectedStorageFunction.type_key1) {

       if (this.selectedStorageFunction.type_key1 === 'AccountId') {
          value = 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk';
       }

       this.rpcParams.push({type: 'string', name: this.selectedStorageFunction.type_key1, value});
     }

     if (this.selectedStorageFunction.type_key2) {

       if (this.selectedStorageFunction.type_key2 === 'AccountId') {
          value = 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk';
       }

       this.rpcParams.push({type: 'string', name: this.selectedStorageFunction.type_key2, value});
     }
  }

  selectStorageFunction(e) {
    this.result = null;
    this.updateParamFields();
  }

  submitStorageCall() {

    const params = [];

    for (const param of this.rpcParams) {
      console.log(param.name, param.value);
      if (param.type === 'BlockHashOrId') {
         if (!param.value) {
           params.push(null);
         } else {
           params.push(+param.value);
         }
       } else {

         if (!param.value) {
           params.push(null);
         } else {
           params.push(param.value);
         }
       }
    }
    console.log(this.selectedBlockHashOrId);
    if (isNumeric(this.selectedBlockHashOrId)) {
      this.selectedBlockHashOrId = +this.selectedBlockHashOrId;
    } else if (!this.selectedBlockHashOrId) {
      this.selectedBlockHashOrId = null;
    }

    this.substrateApiService.executeRPCRequest(
      'runtime_getState',
      [this.selectedStorageFunction.module_name, this.selectedStorageFunction.storage_name, params, this.selectedBlockHashOrId]
    ).subscribe(data => {
      this.result = data.result || '<no result>';
      if (data.error) {
        alert('RPC Error: ' + data.error.message);
      }
    });
  }

}
