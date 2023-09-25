const state = {
  scenarios: [],
};

const mutations = {
  addScenario(state, newArray) {
    state.scenarios.push(newArray);
    localStorage.setItem("scenarios", JSON.stringify(state.scenarios));
  },
  removeScenario(state, index) {
    state.scenarios.splice(index, 1);
    localStorage.setItem("scenarios", JSON.stringify(state.scenarios));
  },
};

const actions = {
  addScenario({ commit }, newArray) {
    commit("addScenario", newArray);
  },
  removeScenario({ commit }, index) {
    commit("removeScenario", index);
  },
};

const getters = {
  scenarios: (state) => state.scenarios,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
