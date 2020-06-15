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
 * substrate-api.service.ts
 *
 */

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {SubstrateAccount} from '../classes/substrate-account.class';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubstrateApiService {
  public ss58Format: number;
  public tokenDecimals: number;
  public tokenSymbol: string;
  public genesisHash: string;

  private requestId: number;
  private currentAccount = new BehaviorSubject<SubstrateAccount>(null);

  constructor(private http: HttpClient) {
    this.requestId = 1;
  }

  public executeRPCRequest(method: string, params = null) {
    return this.http.post<any>(environment.substrateApiUrl, {jsonrpc: '2.0', method, params, id: this.requestId++});
  }

  public getRpcMethods() {
    return this.executeRPCRequest('rpc_methods');
  }

  public setChainProperties() {
    this.executeRPCRequest('system_properties').subscribe(value => {
      console.log('properties', value);
      this.ss58Format = value.result.ss58Format;
      this.tokenDecimals = value.result.tokenDecimals;
      this.tokenSymbol = value.result.tokenSymbol;
    });

    this.executeRPCRequest('chain_getBlockHash', [0]).subscribe(value => {
      console.log('genesisHash', value);
      this.genesisHash = value.result;
    });
  }

  public getAccount() {
    return this.currentAccount.asObservable().pipe(filter(account => account !== null));
  }

  public setAccount(account: SubstrateAccount) {
    this.currentAccount.next(account);
  }
}
