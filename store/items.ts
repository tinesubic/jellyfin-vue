import { BaseItemDto } from '@jellyfin/client-axios';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

export type ItemsState = Record<string, BaseItemDto>;

export const defaultState = (): ItemsState => ({});

export const state = defaultState;

export const getters: GetterTree<ItemsState, ItemsState> = {
  getItem: (state) => (id: string): BaseItemDto | undefined => state[id]
};

export const mutations: MutationTree<ItemsState> = {
  INSERT_ITEM(state: ItemsState, { item }: { item: BaseItemDto }) {
    if (item.Id) state[item.Id] = item;
  },
  CLEAR_STATE() {
    this.replaceState(defaultState());
  }
};

export const actions: ActionTree<ItemsState, ItemsState> = {
  clearState({ commit }) {
    commit('CLEAR_STATE');
  },
  async fetchItem({ commit, getters }, { id }: { id: string }) {
    if (getters.getItem(id) !== undefined) {
      return;
    }

    const item = (
      await this.$api.userLibrary.getItem({
        userId: this.$auth.user.Id,
        itemId: id
      })
    ).data;

    if (!item.Id) throw new Error('No valid object was fetched');

    commit('INSERT_ITEM', { item });
  }
};
