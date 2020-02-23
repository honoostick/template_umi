import { message } from 'antd';
import { queryCurrent, query as queryUsers, followUser, redCheck } from '@/services/user';
import { jsonParse, jsonStringify } from '@/utils/utils';

const userKey = 'app-user-dszz';
// const showKey = loadUser().userId;

function loadUser() {
  try {
    return (
      jsonParse(localStorage.getItem(userKey) || sessionStorage.getItem(userKey) || '{}') || {}
    );
  } catch (e) {
    return {};
  }
}

function storeUser(user, remember, notRemove) {
  let storage = localStorage.getItem(userKey) ? localStorage : sessionStorage;
  if (remember) {
    if (typeof remember.remember !== 'boolean') {
      storage = localStorage.getItem(userKey) ? localStorage : sessionStorage;
    } else {
      storage = remember.remember ? localStorage : sessionStorage;
      if (!notRemove) {
        localStorage.removeItem(userKey);
        sessionStorage.removeItem(userKey);
      }
    }
  }
  if (user) {
    if (user.firstLogin) {
      user = { ...user, firstLogin: false };
    } else {
      user = { ...user, firstLogin: true };
    }
    const exist = loadUser();
    storage.setItem(userKey, jsonStringify({ ...exist, ...user, ...remember }));
  } else if (!notRemove) {
    localStorage.removeItem(userKey);
    sessionStorage.removeItem(userKey);
  }
}

// function loadShow() {
//   try {
//     return (
//       jsonParse(localStorage.getItem(showKey) || sessionStorage.getItem(showKey) || '{}') || {}
//     );
//   } catch (e) {
//     return {};
//   }
// }

// function storeShow(status) {
//   const data = localStorage.getItem(showKey);
//   if (status) {
//     localStorage.setItem(showKey, jsonStringify({ showModal: status }));
//   }
//   if (!data) {
//     localStorage.setItem(showKey, jsonStringify({ showModal: true }));
//   } else {
//     localStorage.setItem(showKey, jsonStringify({ showModal: false }));
//   }
// }

function storeRegisterUser(user) {
  const exist = loadUser();
  sessionStorage.setItem(userKey, jsonStringify({ ...exist, ...user }));
}

function initState() {
  const user = loadUser();
  // const show = loadShow();

  // eslint-disable-next-line no-underscore-dangle
  let menus = user._menus;
  if (!menus) {
    menus = ['home'];
  }
  return {
    currentUser: user,
    authorizedMenus: menus,
    isFirstLogin: true,
    // showStatus: show,
  };
}

const UserModel = {
  namespace: 'user',
  state: initState(),
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *changeCurrentUser({ payload }, { select, put }) {
      yield put({
        type: 'updateCurrentUser',
        payload,
      });
      const { currentUser } = yield select(state => state.user);
      yield put({
        type: 'saveCurrentUser',
        payload: currentUser,
      });
    },

    *saveToken({ payload }, { put, select }) {
      const { currentUser } = yield select(state => state.user);
      yield put({
        type: 'saveCurrentUser',
        payload: { ...currentUser, token: payload },
      });
    },

    *follow({ userId, isFollow }, { call, put }) {
      const { ok, msg } = yield call(followUser, userId, isFollow);
      if (!ok) {
        message.error(msg);
        return {
          isFollow,
          ok,
        };
      }
      if (isFollow) {
        message.success('关注成功');
      } else {
        message.success('取消关注成功');
      }

      yield put({
        type: 'redCheck',
      });

      return {
        isFollow,
        ok,
      };
    },
    *redCheck(_, { call, put }) {
      const { ok, data } = yield call(redCheck);

      if (!ok) {
        // message.error('消息状态获取失败');
        return;
      }

      yield put({
        type: 'save',
        payload: {
          isRed: data.isRead === 0,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      storeRegisterUser(payload);
      return {
        ...state,
        ...payload,
      };
    },
    saveUser(state, { payload }) {
      storeRegisterUser(payload);
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    },
    saveCurrentUser(state, { payload, remember, notRemove }) {
      storeUser(payload, remember, notRemove);
      // storeShow(status);
      return {
        ...state,
        currentUser: payload || {},
        // showStatus: status || {},
      };
    },

    saveMenus(state, { payload }) {
      return {
        ...state,
        authorizedMenus: payload,
      };
    },

    closeModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        isFirstLogin: false,
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    updateCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          headImage: payload.headImage,
          name: payload.name,
        },
      };
    },
  },
};
export default UserModel;
