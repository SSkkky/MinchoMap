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
        // guide({ commit }, action) {
        //     let data;
        //     switch (action.type) {
        //         case 'insert': data = action.data; break;
        //         case 'delete': data = 100; break;
        //     }
        //     commit('saveData', data)
        // }
    },
    modules: {
    }
})
