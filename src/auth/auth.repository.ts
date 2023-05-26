import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from '../knex-config/knexConfig';
import { ILoginUser, IRegisterUser } from './interface/auth.interface';

@Injectable()
export class AuthRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getUserInfo(id: string) {
    const knex = this.knexConfig.instance;
    return knex.select().from('users').where({ id });
  }
  getUser() {
    const knex = this.knexConfig.instance;
    return knex.select().from('users');
  }
  async register(user: IRegisterUser) {
    const knex = this.knexConfig.instance;
    await knex('users').insert(user);
    return {
      message: 'User Successfully registered',
    };
  }
  login(user: ILoginUser) {
    const knex = this.knexConfig.instance;
    return knex.select().from('users').where({ email: user.email });
  }
}
