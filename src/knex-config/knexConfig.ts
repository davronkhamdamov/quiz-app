import knex from 'knex';
import { config } from '../../config/config_db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KnexConfig {
  instance: any;

  constructor() {
    this.instance = knex(config);
  }
}
