import Vue, { VueConstructor } from 'vue';
import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { BaseItemDto } from '@jellyfin/client-axios';
import cloneDeep from 'lodash/cloneDeep';
import {
  state,
  mutations,
  ItemsState,
  defaultState,
  actions,
  getters
} from '../items';

let localVue: VueConstructor<Vue>;
let store: Store<ItemsState>;
let mockCommit: jest.Mock;
let mockDispatch: jest.Mock;

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(Vuex);

  store = new Vuex.Store(cloneDeep({ state, mutations, actions, getters }));

  mockCommit = jest.fn();
  mockDispatch = jest.fn();
});

afterEach((): void => {
  mockCommit.mockReset();
  mockDispatch.mockReset();
});

describe('Vuex: items', () => {
  it('inserts an item when INSERT_ITEM is commited with valid ID', (): void => {
    store.replaceState({ ...defaultState() });

    const item: BaseItemDto = { Id: 'ID' };
    store.commit('INSERT_ITEM', { item });

    expect(store.state.ID).toBe(item);
  });

  it('updates an item when INSERT_ITEM is commited with valid and already set ID', (): void => {
    const item1: BaseItemDto = { Id: 'ID', Name: 'Movie1' };
    const item2: BaseItemDto = { Id: 'ID', Name: 'Movie2' };

    store.replaceState({ ...defaultState(), ID: item1 });

    store.commit('INSERT_ITEM', { item: item2 });

    expect(store.state.ID).toBe(item2);
  });

  it('do nothing when INSERT_ITEM is commited with invalid ID', (): void => {
    store.replaceState({ ...defaultState() });

    const item: BaseItemDto = {};
    store.commit('INSERT_ITEM', { item });

    expect(store.state.ID).toBeUndefined();
  });

  it('clear the state when CLEAR_STATE is commited', (): void => {
    store.replaceState({ ...defaultState(), ID: { Id: 'ID' } });

    store.commit('CLEAR_STATE');

    expect(store.state).toEqual({});
  });

  it('gets the wanted item when getting a present ID', (): void => {
    const id = 'ID';
    const item: BaseItemDto = { Id: id };

    store.replaceState({ ...defaultState() });
    store.state[id] = item;

    const res = store.getters.getItem(id);

    expect(res).toBe(item);
  });
});
