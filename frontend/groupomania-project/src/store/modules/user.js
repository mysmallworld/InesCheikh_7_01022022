import API from '../../routes/api'

const state = {
    userStatus: "",
    user: {}
};

const getters = {
    isUser: state => !!state.user,
    userState: state => state.userStatus
};

const actions = {
    USER: ({ commit, dispatch }) => new Promise((response, reject) => {
        commit('USER');
        API.get('auth/user', 
        {
            headers: { Authorization: "Bearer " +localStorage.getItem("authToken")},
        })
        .then(resp => {
            commit('USER_OK');
            commit('USER_SAVE', resp.data);
            response(resp);
        })
        .catch((error) => {
            commit('USER_ERROR');
            dispatch('LOGOUT');
            reject(error)
        });
    }),

    USER_SIGNUP: ({ commit }, NewUser ) => new Promise((response, reject) => {
        commit('USER');
        API.post('auth/signup', NewUser)
        .then((res) => {
            commit('USER');
            response(res.data);
        })
        .catch((error) => {
            console.log( error.response.data.message );
            commit('USER');
            reject(error.response.data.error)
        })
    }),

    USER_UPDATE: ({ commit, dispatch }) => new Promise((response,reject)=> {
        commit('USER');
        API.update('auth/:id')
        .then(resp => {
            commit('USER_OK');
            dispatch('USER');
            response(resp.data);
        })
        .catch((error) => {
            commit('USER_ERROR');
            reject(error)
        });
    }),

    USER_DELETE : ({ commit, dispatch }) => new Promise((response,reject)=> {
        commit('USER');
        API.delete('auth/:id')
        .then(resp => {
            commit('USER_OK');
            dispatch('LOGOUT');
            response(resp.data);
        })
        .catch((error) => {
            commit('USER_ERROR');
            reject(error)
        });
    })
}

const mutations = {
    USER: state => {
        state.userStatus = "auth";
    },
    USER_OK: (state) => {
        state.userStatus = "ok";
    },
    USER_SAVE: (state,response) => {
        state.user = response;
    },
    USER_ERROR: (state) => {
        state.userStatus = "error";
    },
    LOGOUT: state => {
        state.user = {};
        state.userStatus = "";
    }
}

export default {
    state, 
    getters,
    actions,
    mutations
};