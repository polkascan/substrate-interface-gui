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
 * app.module.ts
 *
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RpcCallsComponent } from './pages/rpc-calls/rpc-calls.component';
import { ExtrinsicsComponent } from './pages/extrinsics/extrinsics.component';
import { ChainStateComponent } from './pages/chain-state/chain-state.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {QrCodeModule} from 'ng-qrcode';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import { PolkascanSignerAddressComponent } from './components/polkascan-signer-address/polkascan-signer-address.component';
import { PolkascanSignerSignatureComponent } from './components/polkascan-signer-signature/polkascan-signer-signature.component';
import { PolkascanSignerExtrinsicQRComponent } from './components/polkascan-signer-extrinsic-qr/polkascan-signer-extrinsic-qr.component';
import { SignMessageComponent } from './pages/sign-message/sign-message.component';

@NgModule({
  declarations: [
    AppComponent,
    RpcCallsComponent,
    ExtrinsicsComponent,
    ChainStateComponent,
    HomeComponent,
    PolkascanSignerAddressComponent,
    PolkascanSignerSignatureComponent,
    PolkascanSignerExtrinsicQRComponent,
    SignMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QrCodeModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
