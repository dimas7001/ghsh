<template>
  <div
    v-for="student in students"
    :key="student.id"
  >
    {{ student }}
  </div>
</template>

<script>
import {
  SubtitleBlock,
  CommitsBlock
} from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'StudentsList',
  components: {
    SubtitleBlock, CommitsBlock
  },
  inject: ['theme', 'goTo'],
  data() {
    return ({
      students: [
        {
          id: '1',
          name: 'name',
          surname: 'surname'
        },
        {
          id: '2',
          name: 'name1',
          surname: 'surname1'
        },
        {
          id: '3',
          name: 'name2',
          surname: 'surname2'
        },
      ]
    })
  },
  computed: {
    ...mapGetters(['getAccessToken']),
    routeParams() {
      return this.$route.params
    },
  },
  async mounted() {
    await sendGET(
      endpoints.courseStudents(this.routeParams.courseID),
      {"Authorization": `Bearer ${this.getAccessToken}`}
    )
    .then(res => {
      if (res) {
        this.students = res
      }
    })
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

