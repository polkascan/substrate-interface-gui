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
 * app-routing.module.ts
 *
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RpcCallsComponent} from './pages/rpc-calls/rpc-calls.component';
import {ChainStateComponent} from './pages/chain-state/chain-state.component';
import {ExtrinsicsComponent} from './pages/extrinsics/extrinsics.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'rpc-calls', component: RpcCallsComponent},
  { path: 'chain-state', component: ChainStateComponent },
  { path: 'create-extrinsic', component: ExtrinsicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
