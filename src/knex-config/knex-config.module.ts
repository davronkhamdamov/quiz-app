import { Module } from '@nestjs/common';
import { KnexConfig } from './knexConfig';

@Module({
  imports: [],
  providers: [KnexConfig],
  exports: [KnexConfig],
})
export class KnexConfigModule {}
