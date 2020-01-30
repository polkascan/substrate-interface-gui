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
