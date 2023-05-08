import { createStore } from 'vuex';

export default createStore({
  state: {
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
    ]
  },
  getters: {
    getAssignments(state) {
      return state.assignments;
    },
    idExists: state => id =>   //check if map with specific id exists
      state.notes.map(({ id }) => id).includes(id)
    ,
  },
  mutations: {
    ADD_NOTE(state, payload) {  //add new note to notes object
      state.notes.push({
        id: payload.id,
        title: payload.title,
        content: payload.content,
        archived: false,
        inBin: false
      });
    },
    EDIT_NOTE(state, editedNote) { //edit existing note
      state.notes.forEach(note => {
        if (note.id === editedNote.id) {
          note.title = editedNote.title;
          note.content = editedNote.content;
          return;
        }
      });
    },
    //delete note with specific id from notes object
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter(note => note.id !== id);
    },
    //change archived property of note with specific id to true
    MOVE_TO_ARCHIVE(state, id) {
      state.notes.find(note => note.id == id).archived = true;
    },
    //change inBin property of note with specific id to true
    MOVE_TO_BIN(state, id) {
      state.notes.find(note => note.id == id).inBin = true;
    },
    //change archived property of note with specific id to false
    MOVE_OUT_ARCHIVE(state, id) {
      state.notes.find(note => note.id == id).archived = false;
    },
    //change inBin property of note with specific id to false
    MOVE_OUT_BIN(state, id) {
      state.notes.find(note => note.id == id).inBin = false;
    },
  }
});
