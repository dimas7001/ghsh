<template>
  <StatisticsBlock
    :theme="theme"
  >
    <TitleBlock>Course Statistics</TitleBlock>
    <div class="statistics__wrapper">
      <div class="statistics__value statistics__value_main">
        <div class="statistics__title">Progress</div>
        <div class="statistics__percentage statistics__percentage_main">{{ courseProgress }}%</div>
        <div class="statistics__hint">of course accomplished</div>
        <div class="statistics__share statistics__share_main">
          <span>{{ tasksPassed }}</span>
          <span>/</span>
          <span>{{ totalTasksCount }}</span>
        </div>
        <div class="statistics__hint">tasks submitted</div>
        <br><br>
        <div class="statistics__title">Cumulative grade</div>
        <div class="statistics__percentage statistics__percentage_main">52%</div>
        <div class="statistics__hint">of all points</div>
        <div class="statistics__share statistics__share_main">
          <span>24</span>
          <span>/</span>
          <span>46</span>
        </div>
        <div class="statistics__hint">points collected</div>
      </div>

      <div
        class="statistics__value"
        v-for="passedTask in passedTasksInfo"
        :key="passedTask.task.id"
      >
        <div class="statistics__title">{{ trimHint(passedTask.task.title) }}</div>
        <div class="statistics__percentage">{{ taskAverage(passedTask) }}%</div>
        <div class="statistics__hint">average grade in %</div>
        <div class="statistics__share">
          <span>{{ passedTask.point || 0 }}</span>
          <span>/</span>
          <span>{{passedTask.task.max_point }}</span>
        </div>
        <div class="statistics__hint">average grade in share</div>
      </div>
    </div>
  </StatisticsBlock>
</template>

<script>
import {
  TitleBlock,
  SubtitleBlock,
  CommitsBlock,
  StatisticsBlock
} from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'StudentsList',
  components: {
    TitleBlock, SubtitleBlock, CommitsBlock, StatisticsBlock
  },
  inject: ['theme', 'goTo', 'routeParams'],
  data() {
    return ({
      totalTasksCount: 0,
      passedTasksInfo: [
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
    async uploadStatistics() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.courseStatisticsStudent(this.routeParams.courseID) :
        endpoints.courseStatisticsTeacher(this.routeParams.courseID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res.total_tasks_count || res.tasks_count) {
          this.passedTasksInfo = res.passed_tasks
          this.totalTasksCount = this.getUserIsStudent ? res.tasks_count : res.total_tasks_count
        }
      })
    },
    taskAverage(passedTask) {
      return Math.round(passedTask.point / passedTask.task.max_point * 100)
    },
    trimHint(hint) {
      const trimRange = 15
      return hint.length > trimRange ? hint.slice(0, trimRange) + '…' : hint
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserIsStudent']),
    courseProgress() {
      return Math.round(this.tasksPassed / this.totalTasksCount * 100)
    },
    tasksPassed() {
      let tasksTotal = 0

      if (this.getUserIsStudent)
        tasksTotal = this.passedTasksInfo.length
      else
        this.passedTasksInfo.forEach(task => {
          tasksTotal += task.students_count
        })

      return tasksTotal
    },
  },
  async mounted() {
    this.uploadStatistics()
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

