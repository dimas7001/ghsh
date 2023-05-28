let domain = "http://25.59.188.46:8080"

export default {
  login: `${domain}/api/v1/auth/authenticate`,
  register: `${domain}/api/v1/auth/register`,
  role: `${domain}/api/v1/auth/user-role`,
  completeRegistrationTeacher: `${domain}/api/v1/educator/profile/create`,
  completeRegistrationStudent: `${domain}/api/v1/student/profile/create`,
  coursesTeacher: `${domain}/api/v1/educator/courses`,
  coursesStudent: `${domain}/api/v1/student/courses`,
  createCourse: `${domain}/api/v1/educator/course/create`,
  deleteCourseStart: `${domain}/api/v1/educator/course/${"courseID"}/delete`,
  profileTeacher: `${domain}/api/v1/educator/profile`,
  profileStudent: `${domain}/api/v1/student/profile`,
  profileTeacherEdit: `${domain}/api/v1/educator/profile/edit`,
  profileStudentEdit: `${domain}/api/v1/student/profile/edit`,
  assignment: `${domain}/api/v1/educator/courses/1/task/1`,
  daleteAssignment: `${domain}/api/v1/educator/course/1/task/5/delete`, //method DELETE
  submitAnswer: `${domain}/api/v1/student/course/4/task/15`,
  submittedAnswer: `${domain}/api/v1/student/courses/1/task/${"assignmentID"}`,
  deleteSubmittedAnswer: `${domain}/api/v1/student/courses/1/task/4/delete`, //method DELETE
  createAssingment: `${domain}/api/v1/educator/course/4/task/create`,
  uploadAssignmentFile: `${domain}/api/v1/educator/course/4/task/15/upload`,
  downloadReport: `${domain}/api/v1/educator/courses/3/student/15/task/10/download`,
  baseFilesChecks: `${domain}/api/v1/educator/courses/1/student/1/lab/4/check-basic-files`,
  commitsActivity: `${domain}/api/v1/educator/courses/1/student/1/task/1/commits`,
  
}
