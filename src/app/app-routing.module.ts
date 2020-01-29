import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RpcCallsComponent} from './pages/rpc-calls/rpc-calls.component';
import {ChainStateComponent} from './pages/chain-state/chain-state.component';
import {ExtrinsicsComponent} from './pages/extrinsics/extrinsics.component';


const routes: Routes = [
  { path: 'rpc-calls', component: RpcCallsComponent},
  { path: 'chain-state', component: ChainStateComponent },
  { path: 'extrinsics', component: ExtrinsicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
