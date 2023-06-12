<template>
  
  <!-- for activity pass data with props -->
  <Activity
    :theme="theme"
  />
  <Commits
    :theme="theme"
  >
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
  </Commits>
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import Activity from '@/components/Activity.vue'
import Commits from '@/components/Commits.vue'
import {
  AssignmentBlock,
  TitleBlock,
  SubtitleBlock,
  AnswerInfoBlock,
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"
import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'formatDate', 'goTo', 'routeParams'],
  data() {
    return ({
      profileInfo: {}
    })
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    currentAssignment() {
      return {}
    },
    async uploadProfileInfo() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.profileTeacherOnCourse(this.routeParams.courseID) :
        endpoints.profileStudentOnCourse(this.routeParams.courseID, this.routeParams.userID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.answer = res
        }
      })
    },
    async uploadAllReposActivity() {
      await sendGET(
        endpoints.allReposActivity(this.routeParams.courseID, this.routeParams.userID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.answer = res
        }
      })
    },
  },
  async mounted() {
    this.uploadProfileInfo()

    if (!this.getUserIsStudent)
      uploadAllReposActivity()

    // await sendGET(
    //   endpoints.repoActivity(this.routeParams.courseID, this.routeParams.studentID, this.routeParams.assignmentID),
    //   {"Authorization": `Bearer ${this.getAccessToken}`}
    // )
    // .then(res => {
    //   if (res) {
    //     this.repoActivity = res
    //   }
    // })
  }
}

// { profile for student
//     "id": 1,
//     "firstname": "John",
//     "lastname": "Doe",
//     "group": "Group A",
//     "age": 21,
//     "email": "johndoe@example.com",
//     "telegram_contact": "@johndoe",
//     "registration_date": "2023-01-08T12:30:00.000+00:00",
//     "passed_tasks": []
// }

// { profile for teacher
//     "id": 1,
//     "firstname": "Kostyantin",
//     "lastname": "Zhereb",
//     "email": "koszher@gmail.com",
//     "age": 33,
//     "telegram_contact": "zhereb"
// }


</script>

