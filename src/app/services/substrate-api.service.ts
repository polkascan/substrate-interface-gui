import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubstrateApiService {

  constructor(private http: HttpClient) {
    this.requestId = 1;
  }

  requestId: number;

  public executeRPCRequest(method: string, params = null) {
    return this.http.post<any>(environment.substrateApiUrl, {jsonrpc: '2.0', method: method, params: params, id: this.requestId++});
  }

  public getRpcMethods() {
    return this.executeRPCRequest('rpc_methods');
  }
}
