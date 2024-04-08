import axios from 'axios';
import { createStore } from 'vuex'
import { getData } from '../api/db';

export default createStore({
    state: { //state값
        data: []
    },
    getters: { //state값 컨트롤
        async getData(state) {
            state.data = await getData()
        }
    },
    mutations: { //state값 수정
        // saveData(state, data) {
        //     state.data.push(data)
        // }
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
