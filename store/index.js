export const state = () => ({
    drawer: true,
    layouts: []
})

export const mutations = {
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    drawer(state, val) {
        state.drawer = val
    },
    SET_LAYOUTS: (state, playload) => {
        state.layouts = playload;
    }
}
export const actions = {
    async nuxtServerInit({ commit, dispatch }, { route, req }) {
        await dispatch("getLayouts");
    },
    async getLayouts({ commit }) {
        const { data } = await this.$axios.get("/api/layouts");
        if (data.layouts.length != 0) {
            commit("SET_LAYOUTS", data.layouts[0]);
        }
    }
}