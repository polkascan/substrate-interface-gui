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
 * param.class.ts
 *
 */

import {decode} from 'base58-universal';

export class SubstrateAccount {
  ss58Address: string;
  publicKey: string;
  genesisHash: string;
  name: string;


  uint8ArrayToHex(arrayBuffer) {
    return Array.prototype.map.call(
        new Uint8Array(arrayBuffer),
        n => n.toString(16).padStart(2, '0')
    ).join('');
  }

  decodeAddress(checkNetworkId: number = null) {

    const decodedUIntArray: Uint8Array = decode(this.ss58Address);

    const networkId = decodedUIntArray[0];
    const publicKey = decodedUIntArray.subarray(1, 33);

    const checksum = decodedUIntArray.subarray(33);

    if (checkNetworkId && networkId !== checkNetworkId) {
      throw new Error('Address did not pass the checkNetworkId check');
    }
    return this.uint8ArrayToHex(publicKey);
  }
}
