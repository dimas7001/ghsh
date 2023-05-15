import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      userTokens: {
        accessToken: "",
        refreshToken: "",
      },
      userRole: "teacher",
    },
    activeSection: "",
    currentCourseID: "",
    assignments: [
      {
        id: 'ta43142',
        name: "Task 1",
        description: "Buffalofish, pompano eulachon dusky grouper goldspotted killifish discus splitfin yellow weaver footballfish, silver hake. Tadpole fish lemon sole skate kelp perch. Buffalofish, pompano eulachon dusky grouper goldspotted killifish discus splitfin yellow weaver footballfish, silver hake. Tadpole fish lemon sole skate kelp perch.",
      },
      {
        id: 'ta43172',
        name: "Task 2",
        description: "Oarfish drum marblefish luminous hake Reedfish slender snipe eel alewife longneck eel mustache triggerfish cow shark slender barracudina!",
      },
      {
        id: 'ta43182',
        name: "Task 3",
        description: "Buffalofish, pompano eulachon dusky grouper goldspotted killifish discus splitfin yellow weaver footballfish, silver hake. Tadpole fish lemon sole skate kelp perch. Buffalofish, pompano eulachon dusky grouper goldspotted killifish discus splitfin yellow weaver footballfish, silver hake. Tadpole fish lemon sole skate kelp perch.",
      },
      {
        id: 'ta42172',
        name: "Task 4",
        description: "Oarfish drum marblefish luminous hake Reedfish slender snipe eel alewife longneck eel mustache triggerfish cow shark slender barracudina!",
      },
    ],
    courses: [
      {
        id: 'co23742',
        name: 'Course 1'
      },
      {
        id: 'co23752',
        name: 'Course 2'
      },
    ]
  },
  getters: {
    getAccessToken(state) {
      return state.user.userTokens.accessToken
    },
    getRefreshToken(state) {
      return state.user.userTokens.refreshToken
    },
    getUserRole(state) {
      return state.user.userRole
    },
    getAssignments(state) {
      return state.assignments
    },
    getAssignment: state => id =>
      state.assignments.find(assignment => assignment.id === id)
    ,
    getCourses(state) {
      return state.courses
    },
    getCurrentCourseID(state) {
      return state.currentCourseID
    },
    // idExists: state => id =>   //check if map with specific id exists
    //   state.notes.map(({ id }) => id).includes(id)
    // ,
  },
  mutations: {
    SET_USER_TOKENS(state, tokens) {
      state.user.userTokens.accessToken = tokens.access_token
      state.user.userTokens.refreshToken = tokens.refresh_token
    },
    CLEAR_DATA(state) {
      state.user.userTokens.accessToken = ""
      state.user.userTokens.refreshToken = ""
      // and much other data
    },
    ADD_CURRENT_COURSE_ID(state, id) {
      state.currentCourseID = id
    },
    CLEAN_CURRENT_COURSE_ID(state) {
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
