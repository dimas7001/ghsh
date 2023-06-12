<template>
  <StudentsListBlock
    :theme="theme"
  >
    <TitleBlock>Students On Course</TitleBlock>
    <div class="students__wrapper">
      <div class="student student_head">
        <div class="student__name">Name</div>
        <div class="student__group">Group</div>
        <div class="student__tasks">Passed Tasks</div>
        <div class="student__average">Average Point</div>
      </div>
      <div
        class="student"
        v-for="student in students"
        :key="student.id"
        @click="goTo({ name: 'user_profile', params: { courseID: `${routeParams.courseID}`, userID: `${student.id}` } })"
      >
        <div
          class="student__name"
        >
          {{ student.firstname + ' ' + student.lastname }}
        </div>
        <div
          class="student__group"
        >
          {{ student.group }}
        </div>
        <div
          class="student__tasks"
        >
          {{ student.passed_tasks.length + '/' + tasksAmount }}
        </div>
        <div
          class="student__average"
        >
          {{ calculateAverage(student.passed_tasks) }}%
        </div>
      </div>
    </div>
  </StudentsListBlock>
</template>

<script>
import {
  TitleBlock,
  SubtitleBlock,
  CommitsBlock,
  StudentsListBlock
} from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'StudentsList',
  components: {
    TitleBlock, SubtitleBlock, CommitsBlock, StudentsListBlock
  },
  inject: ['theme', 'goTo', 'routeParams'],
  data() {
    return ({
      tasksAmount: 0,
      students: [
        // {
        //   id: '1',
        //   name: 'name',
        //   surname: 'surname'
        // },
        // {
        //   id: '2',
        //   name: 'name1',
        //   surname: 'surname1'
        // },
        // {
        //   id: '3',
        //   name: 'name2',
        //   surname: 'surname2'
        // },
      ]
    })
  },
  methods: {
    calculateAverage(passed_tasks) {
      let shareArr = [],
          sharesSum = 0

      passed_tasks.forEach(item => {
        shareArr.push(item.point / item.task.max_point)
      })

      shareArr.forEach(share => {
        sharesSum += share
      })

      return Math.round(sharesSum / shareArr.length * 100)
    },
    async uploadStudentsList() {
      await sendGET(
        endpoints.courseStudents(this.routeParams.courseID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.students = res
        }
      })
    },
    async uploadCourse() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.courseByIDStudent(this.routeParams.courseID) :
        endpoints.courseByIDTeacher(this.routeParams.courseID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res.id) {
          this.tasksAmount = res.tasks.length
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getAccessToken']),
  },
  async mounted() {
    this.uploadCourse()
    this.uploadStudentsList()
  }
}

// [
//   {
//     "id": 1,
//     "firstname": "John",
//     "lastname": "Doe",
//     "group": "Group A",
//     "passed_tasks": [
//       {
//         "id": 2,
//         "point": 7,
//         "task": {
//           "id": 2,
//           "title": "SQL Queries",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 3,
//         "point": 7,
//         "task": {
//           "id": 3,
//           "title": "Server-side Scripting",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 4,
//         "point": null,
//         "task": {
//           "id": 4,
//           "title": "API Development",
//           "max_point": 10
//         },
//         "is_assessed": false
//       },
//       {
//         "id": 1,
//         "point": 5,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "firstname": "Jane",
//     "lastname": "Smith",
//     "group": "Group B",
//     "passed_tasks": [
//       {
//         "id": 5,
//         "point": 8,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 6,
//         "point": 8,
//         "task": {
//           "id": 3,
//           "title": "Server-side Scripting",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 7,
//         "point": 7,
//         "task": {
//           "id": 5,
//           "title": "Security and Authentication",
//           "max_point": 10
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 3,
//     "firstname": "Bob",
//     "lastname": "Johnson",
//     "group": "Group A",
//     "passed_tasks": [
//       {
//         "id": 10,
//         "point": 7,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 5,
//     "firstname": "Tom",
//     "lastname": "Brown",
//     "group": "Group B",
//     "passed_tasks": [
//       {
//         "id": 13,
//         "point": 8,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 14,
//         "point": 6,
//         "task": {
//           "id": 2,
//           "title": "SQL Queries",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 15,
//         "point": 9,
//         "task": {
//           "id": 3,
//           "title": "Server-side Scripting",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 16,
//         "point": 10,
//         "task": {
//           "id": 4,
//           "title": "API Development",
//           "max_point": 10
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 7,
//     "firstname": "Matthew",
//     "lastname": "Nguyen",
//     "group": "Group A",
//     "passed_tasks": [
//       {
//         "id": 22,
//         "point": 7,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 23,
//         "point": null,
//         "task": {
//           "id": 2,
//           "title": "SQL Queries",
//           "max_point": 9
//         },
//         "is_assessed": false
//       },
//       {
//         "id": 24,
//         "point": 8,
//         "task": {
//           "id": 3,
//           "title": "Server-side Scripting",
//           "max_point": 9
//         },
//         "is_assessed": true
//       },
//       {
//         "id": 25,
//         "point": 10,
//         "task": {
//           "id": 5,
//           "title": "Security and Authentication",
//           "max_point": 10
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 8,
//     "firstname": "Olivia",
//     "lastname": "Garcia",
//     "group": "Group A",
//     "passed_tasks": [
//       {
//         "id": 26,
//         "point": 7,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       }
//     ]
//   },
//   {
//     "id": 9,
//     "firstname": "Ethan",
//     "lastname": "Kim",
//     "group": "Group C",
//     "passed_tasks": [
//       {
//         "id": 28,
//         "point": 8,
//         "task": {
//           "id": 1,
//           "title": "Database Fundamentals",
//           "max_point": 8
//         },
//         "is_assessed": true
//       }
//     ]
//   }
// ]
</script>

