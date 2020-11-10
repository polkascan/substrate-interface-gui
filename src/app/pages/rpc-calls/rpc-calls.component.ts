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
 * rpc-calls.component.ts
 *
 */

import { Component, OnInit } from '@angular/core';
import {SubstrateApiService} from '../../services/substrate-api.service';
import { RpcRequestParam } from 'src/app/classes/param.class';
import {SubstrateAccount} from '../../classes/substrate-account.class';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-rpc-calls',
  templateUrl: './rpc-calls.component.html',
  styleUrls: ['./rpc-calls.component.scss']
})
export class RpcCallsComponent implements OnInit {

  public rpcMethods = ['Loading..'];
  public selectedRpcMethod: string;
  public rpcEndpoint: string;

  public result: string;
  public errorMessage: string;

  public rpcParams: RpcRequestParam[] = [];
  public callFunctions = [];
  public selectedCallFunction;

  public currentAccount: SubstrateAccount;

  constructor(private substrateApiService: SubstrateApiService) { }

  ngOnInit() {
    this.rpcEndpoint = environment.substrateApiUrl;

    this.substrateApiService.getAccount().subscribe(account => this.currentAccount = account);

    this.errorMessage = null;

    this.substrateApiService.getRpcMethods().subscribe(data => {
      this.rpcMethods = data.result.methods;
      this.selectedRpcMethod = 'runtime_getBlock';
      this.updateParamFields();
    });

    this.substrateApiService.executeRPCRequest('runtime_getMetadataCallFunctions').subscribe(data => {
      this.callFunctions = data.result;
      this.selectedCallFunction = this.callFunctions[1]; // default to System.remark
      this.updateParamFields();
    });
  }

  updateParamValue(event, param) {
    param.value = JSON.parse(event.target.value);
  }

  updateParamFields() {
     this.rpcParams = [];

     switch (this.selectedRpcMethod) {
      case 'runtime_addCustomType':
        this.rpcParams.push({type: 'string', name: 'Type name', value: 'MyCustomType'});
        this.rpcParams.push({type: 'dict', name: 'Type definition', value: {
          type: 'struct',
          type_mapping: [
             ['index', 'u32'],
             ['members', 'Vec<AccountId>']
              ]
        }});
        break;
      case 'runtime_createSignaturePayload':
      case 'runtime_createExternalSignerPayload':
        this.rpcParams.push({type: 'string', name: 'Account', value: this.currentAccount ? this.currentAccount.ss58Address : 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk'});
        this.rpcParams.push({type: 'callFunction', name: 'Call Function', value: 'transfer'});
        this.rpcParams.push({type: 'array', name: 'Parameters', value: {
                          _remark: 'Test message'
                        }
        });
        break;
      case 'runtime_createExtrinsic':
      case 'runtime_submitExtrinsic':
        this.rpcParams.push({type: 'string', name: 'Account', value: this.currentAccount ? this.currentAccount.ss58Address : 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk'});
        this.rpcParams.push({type: 'callFunction', name: 'Call Function', value: 'transfer'});
        this.rpcParams.push({type: 'array', name: 'Parameters', value: {
                          _remark: 'Test message'
                        }
        });
        this.rpcParams.push({type: 'cryptoType', name: 'Crypto Type', value: 1});
        this.rpcParams.push({type: 'string', name: 'Signature', value: '0x84e092bdf924b4d67adf896284ae8854e504d5c6210ff4168716004a9b82b32b84ff7a9952c93fe51486faf7229b4e1f76875d06058094a11e17e85b3fc96e8c'});
        break;
      case 'runtime_getPaymentInfo':
        this.rpcParams.push({type: 'string', name: 'Account', value: this.currentAccount ? this.currentAccount.ss58Address : 'EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk'});
        this.rpcParams.push({type: 'callFunction', name: 'Call Function', value: 'remark'});
        this.rpcParams.push({type: 'array', name: 'Parameters', value: {
                          _remark: 'Test message'
                        }
        });
        break;
      case 'runtime_decodeScale':
        this.rpcParams.push({type: 'string', name: 'Type String', value: 'BlockNumber'});
        this.rpcParams.push({type: 'string', name: 'SCALE hex-bytes', value: '0x020a0000'});
        break;
      case 'runtime_encodeScale':
        this.rpcParams.push({type: 'string', name: 'Type String', value: 'Timepoint'});
        this.rpcParams.push({type: 'dict', name: 'Value', value: {height: 345678, index: 5}});
        break;
      case 'runtime_getState':
        this.rpcParams.push({type: 'string', name: 'Module', value: 'System'});
        this.rpcParams.push({type: 'string', name: 'Storage function', value: 'Account'});
        this.rpcParams.push({type: 'array', name: 'Parameters', value: this.currentAccount ? [this.currentAccount.ss58Address] : ['EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk']});
        this.rpcParams.push({type: 'BlockHashOrId', name: 'Block hash or ID', value: null});
        break;
      case 'runtime_getBlock':
      case 'runtime_getMetadata':
      case 'runtime_getMetadataModules':
      case 'runtime_getMetadataCallFunctions':
      case 'runtime_getMetadataEvents':
      case 'runtime_getMetadataConstants':
      case 'runtime_getMetadataStorageFunctions':
      case 'runtime_getMetadataErrors':
      case 'runtime_getTypeRegistry':
        this.rpcParams.push({type: 'BlockHashOrId', name: 'Block hash or ID', value: null});
        break;
      case 'runtime_getMetadataCallFunction':
      case 'runtime_getMetadataEvent':
      case 'runtime_getMetadataConstant':
      case 'runtime_getMetadataStorageFunction':
      case 'runtime_getMetadataError':
        this.rpcParams.push({type: 'string', name: 'Module Name', value: null});
        this.rpcParams.push({type: 'string', name: 'Item Name', value: null});
        this.rpcParams.push({type: 'BlockHashOrId', name: 'Block hash or ID', value: null});
        break;
      case 'runtime_getType':
        this.rpcParams.push({type: 'string', name: 'Type string', value: 'IdentityInfo'});
        this.rpcParams.push({type: 'BlockHashOrId', name: 'Block hash or ID', value: 300000});
        break;
      case 'runtime_setCustomTypes':
        this.rpcParams.push({type: 'dict', name: 'Custom Types', value: {MyCustomType2: 'u32'}});
        break;
      case 'runtime_removeCustomType':
        this.rpcParams.push({type: 'string', name: 'Custom Type string', value: 'MyCustomType'});
        break;
      case 'keypair_create':
        this.rpcParams.push({type: 'number', name: 'Number of words (12 (default), 15, 18, 21 or 24)', value: 12});
        this.rpcParams.push({type: 'cryptoType', name: 'Crypto Type', value: 1});
        break;
      case 'keypair_inspect':
        this.rpcParams.push({type: 'string', name: 'Account mnemonic', value: 'hope advance orange pool weather tuition caught notable letter calm panda approve'});
        this.rpcParams.push({type: 'cryptoType', name: 'Crypto Type', value: 1});
        break;
      case 'keypair_sign':
        this.rpcParams.push({type: 'string', name: 'Account mnemonic', value: 'hope advance orange pool weather tuition caught notable letter calm panda approve'});
        this.rpcParams.push({type: 'string', name: 'Data (hex or string)', value: 'test'});
        this.rpcParams.push({type: 'cryptoType', name: 'Crypto Type', value: 1});
        break;
      case 'keypair_verify':
        this.rpcParams.push({type: 'string', name: 'Account address', value: 'D2yeEhriVJ4CowCV4C54BcyEsh3kr5ysrJTPFr2FdMyK2t1'});
        this.rpcParams.push({type: 'string', name: 'Data (hex or string)', value: 'test'});
        this.rpcParams.push({type: 'string', name: 'Signature', value: '0x8e09d1af9ad0e2b5a9431646216db14e2196681d6d5656e3b06ee948f821ff76201ed033ae381b656aeb986c57109febe7da5a29a5184ce75c773d2774d09e8a'});
        this.rpcParams.push({type: 'cryptoType', name: 'Crypto Type', value: 1});
        break;
    }
  }

  isNewRpcMethod(value) {
    return !value || value.startsWith('runtime_') || value.startsWith('keypair_');
  }

  selectRpcMethod(e) {
    this.selectedRpcMethod = e.target.value;

    this.result = null;
    this.updateParamFields();
  }

  addParameter() {
    this.rpcParams.push({type: 'string', name: 'Parameter ' + (this.rpcParams.length + 1), value: null});
  }

  submitCall() {

    this.errorMessage = null;

    const params = [];

    for (const param of this.rpcParams) {
      console.log(param.name, param.value);
      if (param.type === 'BlockHashOrId') {
        if (!param.value) {
          params.push(null);
        } else {
          params.push(+param.value);
        }
      } else if (param.type === 'callFunction') {

        params.push(this.selectedCallFunction.module_name);
        params.push(this.selectedCallFunction.call_name);

      } else {
       if (!param.value) {
         params.push(null);
       } else {
         params.push(param.value);
       }
      }
    }

    this.substrateApiService.executeRPCRequest(this.selectedRpcMethod, params).subscribe(data => {

      this.result = data.result;
      if (data.error) {
        this.errorMessage = 'RPC Error: ' + data.error.message;
      }
    }, error => {
      this.errorMessage = 'RPC error: ' + error.statusText;
    });
  }

}
