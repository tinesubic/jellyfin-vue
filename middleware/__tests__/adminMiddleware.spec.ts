import { Context } from '@nuxt/types';
import sinon from 'sinon';
import adminMiddleware from '../adminMiddleware';

const spy = sinon.spy();

const BASE_INPUT = ({
  $auth: {
    user: {
      Policy: {
        IsAdministrator: false
      }
    }
  },
  redirect: spy
} as unknown) as Context;

const INPUT_NOT_ADMIN = {
  ...BASE_INPUT
};

const INPUT_ADMIN = ({
  ...BASE_INPUT,
  $auth: {
    user: {
      Policy: {
        IsAdministrator: true
      }
    }
  }
} as unknown) as Context;

afterEach(() => spy.resetHistory());

describe('adminMiddleware', () => {
  it('redirect to "/" when user is not an administrator', (): void => {
    adminMiddleware(INPUT_NOT_ADMIN);

    expect(spy.getCall(0).args[0]).toBe('/');
  });

  it('does not redirect when user is not an administrator', (): void => {
    adminMiddleware(INPUT_ADMIN);

    expect(spy.notCalled).toBe(true);
  });
});
