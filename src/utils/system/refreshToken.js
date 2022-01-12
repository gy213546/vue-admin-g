import {
    useStore
} from 'vuex'
import {
    useRoute
} from 'vue-router'
let tokenTimer = null;
// 步长
const step = 10;
// 刷新时间 s
const refreshTime = 3600;
// 轮询间隔
const interTime = 10000;
// 刷新token锁
let refreshLock = false;


const _refresh = (store, route) => {
    if (route.query.newWindow) return
    const expires_in = store.getters['user/expires_in'];
    if (store.getters['user/expires_in'] <= refreshTime && !refreshLock) {
        refreshLock != refreshLock;
        store.dispatch('user/RefreshToken').catch(() => clearTimer())
        refreshLock != refreshLock;
    }
    store.commit('user/SET_EXPIRES_IN', expires_in - step)
}

export const refresh = () => {
    const store = useStore();
    const route = useRoute();
    _refresh(store, route)
    tokenTimer = setInterval(() => _refresh(store, route), interTime)
}


export const clearTimer = () => {
    clearInterval(tokenTimer);
    tokenTimer = null
}