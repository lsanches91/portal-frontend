import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { this.init(); }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this.reloadStorageIfNull();
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    await this.reloadStorageIfNull();
    var storage = this._storage;
    var value = await this._storage?.get(key);
    return value;
  }

  public async remove(key: string) {
    await this.reloadStorageIfNull();
    await this.storage?.remove(key);
  }

  private async reloadStorageIfNull() {
    if (this._storage == undefined || this._storage == null) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }
}
