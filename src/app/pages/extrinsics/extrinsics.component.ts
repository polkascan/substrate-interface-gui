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
