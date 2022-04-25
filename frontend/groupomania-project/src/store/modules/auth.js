import API from '../../routes/api'

const state = {
    token: localStorage.getItem("authToken") || "",
    authStatus: "",
};

const getters = {
    isAuth: state => !!state.token,
    userAuth: state => state.authStatus
};

const actions = {
    AUTH: ({ commit }, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH');
            API.post('auth/login', user)
                .then(resp => {
                    localStorage.setItem("authToken", resp.data.token);
                    localStorage.setItem("id", resp.data.id);
                    API.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.token;
                    commit('REQ_OK', resp.data.token)
                    resolve(resp.data)
                        .catch((userERROR) => {
                            commit('LOGOUT');
                            reject(userERROR.response)
                        })
                })
                .catch(error => {
                    commit('REQ_ERROR', error, user.error = "Email/mot de passe invalide !");
                    commit('LOGOUT');
                    //reject(error.response.data.error);
                });
        });
    },
    LOGOUT: ({ commit }) => {
        return new Promise(resolve => {
            commit('LOGOUT');
            localStorage.removeItem('authToken');
            resolve();
        });
    }
};

const mutations = {
    AUTH: state => {
        state.authStatus = "auth";
    },
    REQ_OK: (state, token) => {
        state.authStatus = "ok";
        state.token = token;
    },
    REQ_ERROR: state => {
        state.authStatus = "error";
    },
    LOGOUT: state => {
        state.token = "";
        state.authStatus = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};