let domain = "http://25.59.188.46:8080"

export default {
  login: `${domain}/api/v1/auth/authenticate`,
  getCoursesEducator: `${domain}/api/v1/educator/courses`,
  createCourse: `${domain}/api/v1/educator/course/create`,
}
