import { createStore } from 'vuex';

export default createStore({
  state: {
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
    getAssignments(state) {
      return state.assignments;
    },
    getCourses(state) {
      return state.courses;
    },
    getCurrentCourseID(state) {
      return state.currentCourseID;
    },
    idExists: state => id =>   //check if map with specific id exists
      state.notes.map(({ id }) => id).includes(id)
    ,
  },
  mutations: {
    ADD_CURRENT_COURSE_ID(state, id) {
      state.currentCourseID = id
    },
    CLEAN_CURRENT_COURSE_ID(state) {
      state.currentCourseID = ""
    },
    EDIT_ASSIGNMENT(state, editedAnssignment) {
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
