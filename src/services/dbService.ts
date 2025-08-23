import { KoreksiReq } from '@/models/koreksiModel';
import Dexie, { type Table } from 'dexie';

export interface KoreksiKehadiranQueueItem {
  id?: number;
  pengajuan_id: string;
  data: KoreksiReq;
  timestamp: number;
}

export class MySubClassedDexie extends Dexie {
  koreksiQueue!: Table<KoreksiKehadiranQueueItem>; 

  constructor() {
    super('absensiDatabase');
    this.version(1).stores({
      koreksiQueue: '++id, pengajuan_id', 
    });
  }
}

export const db = new MySubClassedDexie();