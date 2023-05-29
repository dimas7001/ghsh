import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      userTokens: {
        // accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfRURVQ0FUT1IifV0sInN1YiI6Imtvc3R5YSIsImlhdCI6MTY4NTI2MTU5NiwiZXhwIjoxNjg1ODYxNTk2fQ.2GGG09vHk7mJBe5-DnAQoZeNAA3v051vm6Z38S7c_1A",
        accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwic3ViIjoiU3J1ZGVudDEiLCJpYXQiOjE2ODUzNTc4MTIsImV4cCI6MTY4NTk1NzgxMn0.AvTuHpY06aKGVDpa216klMT6uebz9NtzO4dC2MUKt70",
        refreshToken: "",
      },
      isStudent: true,
    },
    activeSection: "",
    courses: [
      {
        id: 1,
        "title": "Back-end",
        "description": "Course for Back-end developers",
        "educator": "Kostyantin Zhereb",
        "tasks": [
          {
            "id": 1,
            "title": "Database Fundamentals",
            description: "Learn the basics of database design and management",
            "start_date": "2023-01-08T12:30:00.000+00:00",
            "end_date": "2023-01-08T12:30:00.000+00:00",
            "max_point": 8.0
          },
          {
            "id": 2,
            "title": "SQL Queries",
            "description": "Learn how to write SQL queries to retrieve and manipulate data",
            "start_date": "2023-01-10T12:30:00.000+00:00",
            "end_date": "2023-01-15T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 3,
            "title": "Server-side Scripting",
            "description": "Learn how to write server-side scripts using PHP",
            "start_date": "2023-01-16T12:30:00.000+00:00",
            "end_date": "2023-01-20T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 4,
            "title": "API Development",
            "description": "Learn how to develop RESTful APIs for web applications",
            "start_date": "2023-01-21T12:30:00.000+00:00",
            "end_date": "2023-01-23T12:30:00.000+00:00",
            "max_point": 10.0
          },
          {
            "id": 5,
            "title": "Security and Authentication",
            "description": "Learn about web application security and authentication techniques",
            "start_date": "2023-01-24T12:30:00.000+00:00",
            "end_date": "2023-01-30T12:30:00.000+00:00",
            "max_point": 10.0
          }
        ],
        "start_date": "2023-01-08T12:30:00.000+00:00",
        "end_date": "2023-03-08T12:30:00.000+00:00"
      },
      {
        "id": 2,
        "title": "Back-end",
        "description": "Course for Back-end developers",
        "educator": "Kostyantin Zhereb",
        "tasks": [
          {
            "id": 1,
            "title": "Database Fundamentals",
            "description": "Learn the basics of database design and management",
            "start_date": "2023-01-08T12:30:00.000+00:00",
            "end_date": "2023-01-08T12:30:00.000+00:00",
            "max_point": 8.0
          },
          {
            "id": 2,
            "title": "SQL Queries",
            "description": "Learn how to write SQL queries to retrieve and manipulate data",
            "start_date": "2023-01-10T12:30:00.000+00:00",
            "end_date": "2023-01-15T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 3,
            "title": "Server-side Scripting",
            "description": "Learn how to write server-side scripts using PHP",
            "start_date": "2023-01-16T12:30:00.000+00:00",
            "end_date": "2023-01-20T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 4,
            "title": "API Development",
            "description": "Learn how to develop RESTful APIs for web applications",
            "start_date": "2023-01-21T12:30:00.000+00:00",
            "end_date": "2023-01-23T12:30:00.000+00:00",
            "max_point": 10.0
          },
          {
            "id": 5,
            "title": "Security and Authentication",
            "description": "Learn about web application security and authentication techniques",
            "start_date": "2023-01-24T12:30:00.000+00:00",
            "end_date": "2023-01-30T12:30:00.000+00:00",
            "max_point": 10.0
          }
        ],
        "start_date": "2023-01-08T12:30:00.000+00:00",
        "end_date": "2023-03-08T12:30:00.000+00:00"
      }
    ]
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
