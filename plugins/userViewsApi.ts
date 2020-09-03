import { Context } from '@nuxt/types';
import { UserViewsApi } from '../api/api';
import { Configuration } from '../api/configuration';

declare module '@nuxt/types' {
  interface Context {
    $userViewsApi: UserViewsApi;
  }

  interface NuxtAppOptions {
    $userViewsApi: UserViewsApi;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $userViewsApi: UserViewsApi;
  }
}

export default (context: Context, inject: Function) => {
  const config = new Configuration();

  const userViewsApi = new UserViewsApi(config, '', context.$axios);
  inject('userViewsApi', userViewsApi);
};
