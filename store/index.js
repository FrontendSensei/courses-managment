export const actions = {
  async nuxtServerInit({ commit }) {
    const courses = await this.$axios.$get('data.json')
    commit('courses/setCourses', courses)
  },
}
