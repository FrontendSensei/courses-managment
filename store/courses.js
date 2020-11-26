export const state = () => ({
  courses: {},
})

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
  setCourse(state, course) {
    state.courses[course.id] = course
  },
  deleteCourse(state, courseId) {
    delete state.courses[courseId]
    state.courses = { ...state.courses }
  },
}

export const actions = {
  setCourses({ commit }, courses) {
    commit('setCourses', courses)
  },
  setCourse({ commit }, course) {
    commit('setCourse', course)
  },
  deleteCourse({ commit }, courseId) {
    commit('deleteCourse', courseId)
  },
}

export const getters = {
  courses: (state) => state.courses,
  course: (state) => (id) => state.courses[id],
}
