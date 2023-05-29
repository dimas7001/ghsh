<template>
    {{ info }}
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
      info: [
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
      endpoints.courseStatistics(this.routeParams.courseID),
      {"Authorization": `Bearer ${this.getAccessToken}`}
    )
    .then(res => {
      if (res) {
        this.info = res
      }
    })
  }
}
// {
//   "passed_tasks": [
//     {
//       "point": 7.4,
//       "task": {
//         "id": 1,
//         "title": "Database Fundamentals",
//         "max_point": 8
//       },
//       "students_count": 10
//     },
//     {
//       "point": 7.4,
//       "task": {
//         "id": 2,
//         "title": "SQL Queries",
//         "max_point": 9
//       },
//       "students_count": 6
//     },
//     {
//       "point": 8.2,
//       "task": {
//         "id": 3,
//         "title": "Server-side Scripting",
//         "max_point": 9
//       },
//       "students_count": 5
//     },
//     {
//       "point": 10,
//       "task": {
//         "id": 4,
//         "title": "API Development",
//         "max_point": 10
//       },
//       "students_count": 2
//     },
//     {
//       "point": 8.5,
//       "task": {
//         "id": 5,
//         "title": "Security and Authentication",
//         "max_point": 10
//       },
//       "students_count": 2
//     }
//   ],
//   "total_tasks_count": 35
// }
</script>

