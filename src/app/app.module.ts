import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RpcCallsComponent } from './pages/rpc-calls/rpc-calls.component';
import { ExtrinsicsComponent } from './pages/extrinsics/extrinsics.component';
import { ChainStateComponent } from './pages/chain-state/chain-state.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    RpcCallsComponent,
    ExtrinsicsComponent,
    ChainStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
