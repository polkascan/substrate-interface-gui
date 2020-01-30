import { Component, OnInit } from '@angular/core';
import {RpcRequestParam} from '../../classes/param.class';
import {SubstrateApiService} from '../../services/substrate-api.service';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-extrinsics',
  templateUrl: './extrinsics.component.html',
  styleUrls: ['./extrinsics.component.scss']
})
export class ExtrinsicsComponent implements OnInit {

  public callFunctions = [];
  public selectedCallFunction;
  public result: string;
  public rpcParams: RpcRequestParam[] = [];

  constructor(private substrateApiService: SubstrateApiService) { }

  ngOnInit() {
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
    console.log(param.value);
  }

  selectCallFunction(e) {
    this.result = null;
    this.updateParamFields();
  }

   composeCall() {

    const params = {};

    for (const param of this.rpcParams) {

      if (param.type === 'numeric' ||  isNumeric(param.value)) {
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

    this.substrateApiService.executeRPCRequest(
      'runtime_composeCall',
      [this.selectedCallFunction.module_name, this.selectedCallFunction.call_name, params]
    ).subscribe(data => {
      this.result = data.result || '<no result>';
      if (data.error) {
        alert('RPC Error: ' + data.error.message);
      }
    });
  }
}
