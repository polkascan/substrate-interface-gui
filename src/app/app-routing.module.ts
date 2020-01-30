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
  { path: 'compose-call', component: ExtrinsicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
