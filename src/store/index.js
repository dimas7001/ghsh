import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      userTokens: {
        // accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfRURVQ0FUT1IifV0sInN1YiI6Imtvc3R5YSIsImlhdCI6MTY4NTk5ODA4MCwiZXhwIjoxNjg2NTk4MDgwfQ.yvSZm20dtT1GrOf8dnvXJLMG5QrzPnvBFqG1XdGIwuY",
        accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwic3ViIjoiSmFuZSIsImlhdCI6MTY4NTcyMTI0MiwiZXhwIjoxNjg2MzIxMjQyfQ.n8WatGWZQWZY9qcSZzbmLD422AdQZclD9-fsd8vryEg",
        refreshToken: "",
      },
      isStudent: true,
    },
  },
  getters: {
    getAccessToken(state) {
      return state.user.userTokens.accessToken
    },
    getRefreshToken(state) {
      return state.user.userTokens.refreshToken
    },
    getUserIsStudent(state) {
      return state.user.isStudent
    },
    getCourses(state) {
      return state.courses
    },
  },
  mutations: {
    SET_USER_TOKENS(state, tokens) {
      state.user.userTokens.accessToken = tokens.access_token
      state.user.userTokens.refreshToken = tokens.refresh_token
    },
    SET_USER_IS_STUDENT(state, val) {
      state.user.isStudent = val
    },
    CLEAR_USER_DATA(state) {
      state.user.userTokens.accessToken = ""
      state.user.userTokens.refreshToken = ""
      // and much other data
    },
    ADD_CURRENT_COURSE_ID(state, id) {
      state.currentCourseID = id
    },
    CLEAR_CURRENT_COURSE_ID(state) {
      state.currentCourseID = ""
    },
    EDIT_ASSIGNMENT(state, editedAssignment) {
      state.assignments.forEach(assignment => {
        if (assignment.id === editedAssignment.id) {
          assignment.name = editedAssignment.name;
          assignment.description = editedAssignment.description;
          return;
        }
      });
      state.assignments = state.assignments.filter((assignment) => id !== assignment.id)
    },
    DELETE_ASSIGNMENT(state, id) {
      state.assignments = state.assignments.filter((assignment) => id !== assignment.id)
    },
  }
});
