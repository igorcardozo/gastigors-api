import { XataClient } from './xata/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getXataClient } from './xata';
import { XataRecord, Repository } from '@xata.io/client';
import { DatabaseModel } from './interfaces/database';

@Injectable()
export class DatabaseService<T> {
  private _xata: XataClient;
  private _model: DatabaseModel;

  constructor() {
    this._xata = getXataClient();
  }

  private getRepo = (): Repository<T & XataRecord> => {
    if (!this._model) throw new Error('Model not defined');
    const repo = this._xata.db[this._model as any] as Repository<
      T & XataRecord
    >;

    return repo;
  };

  setModel(model: DatabaseModel) {
    this._model = model;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const repo = this.getRepo();
    const createdData = await repo.create(data as any);
    return createdData as T;
  }

  async deleteById(id: string): Promise<boolean> {
    const repo = this.getRepo();
    const recordDeleted = await repo.delete(id);
    return !!recordDeleted;
  }

  async getById(id: string): Promise<T> {
    const repo = this.getRepo();
    const record = (await repo.read(id)) as T | null;
    if (!record) throw new NotFoundException();
    return record;
  }

  async getAll(): Promise<T[]> {
    const repo = this.getRepo();
    const records = (await repo.getAll()) as T[];
    return records;
  }
}
