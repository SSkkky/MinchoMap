import { createStore } from 'vuex'
import { getData } from '../api/db';

export default createStore({
    state: { //state값
        data: [],
        loginData: {},
        accessToken: '',
        isOnToken: false,
        copyData: [],
    },
    getters: { //state값 컨트롤
        async getData(state) {
            state.data = await getData()
        },
    },
    mutations: { //state값 수정
        setData(state, data) {
            state.data = data;
        },
        setLoginData(state, data) {
            state.loginData = data;
        },
        setAccessToken(state, data) {
            state.accessToken = data;
        },
        setOnToken(state, data) {
            state.isOnToken = data;
        },
        setCopyData(state, data) {
            state.copyData = data;
        },
    },
    actions: { //mutations에 작업지시(비동기)
        async fetchDetailData({ commit, getters }, routeParams) {
            const currentData = getters.getData;
            const filteredData = currentData.filter((item) => item.id === routeParams.id);
            commit('setDetailData', filteredData[0]);
        }
    },
    modules: {
    }
})
