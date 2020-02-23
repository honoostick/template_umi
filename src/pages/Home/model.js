export default {
  namespace: 'Home',
  state: {
  },

  effects: {
    *fetch(_, { put }) {
      yield put({
        type: 'save',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
