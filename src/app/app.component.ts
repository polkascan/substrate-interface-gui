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
 * app.component.ts
 *
 */

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {SubstrateApiService} from './services/substrate-api.service';
import {Observable, Subscription} from 'rxjs';
import {SubstrateAccount} from './classes/substrate-account.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Polkascan Substrate Interface';

  public showNavigation = false;
  public account$: Observable<SubstrateAccount>;

  constructor(
    private substrateApiService: SubstrateApiService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }

  ngOnInit(): void {
    console.log('Account in local store', this.storage.get('account'));
    this.substrateApiService.setAccount(this.storage.get('account'));

    this.substrateApiService.setChainProperties();

    console.log(this.substrateApiService);

    this.account$ = this.substrateApiService.getAccount();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      // this.accountSubscription.unsubscribe();
  }
}
