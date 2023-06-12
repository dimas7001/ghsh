<template>
  <StudentsAnswersBlock
    :theme="theme"
  >
    <SubtitleBlock>Students' Answers</SubtitleBlock>
    <div
      class="answer"
      v-for="answer in studentAnswers"
      :key="answer.id"
      @click="goTo({ name: 'answer', params: { studentID: answer.id, answerID: answer.passed_tasks[0].id } })"
    >
      <div class="answer__section answer__section_info">
        <div class="answer__block">
          <div class="answer__student-info">{{ answer.firstname + ' ' + answer.lastname + ' - ' + answer.group }}</div>
          <a
            class="answer__link"
            :href="answer.passed_tasks[0].github_reference"
            target="_blank"
          >{{ answer.passed_tasks[0].github_reference }}</a>
        </div>
        <div
          class="answer__comment"
          v-if="answer.passed_tasks[0].student_comment"
        >{{ answer.passed_tasks[0].student_comment }}</div>
      </div>
      <div class="answer__section answer__section_grade">
        <span>{{ answer.passed_tasks[0].point }}/{{ answer.passed_tasks[0].task.max_point }}</span>
      </div>
    </div>
  </StudentsAnswersBlock>
</template>

<script>
import {
  SubtitleBlock,
  StudentsAnswersBlock
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'StudentsAnswers',
  components: {
    SubtitleBlock, StudentsAnswersBlock
  },
  inject: ['theme', 'goTo', 'routeParams'],
  data() {
    return ({
      studentAnswers: [
        {
          "id": 1,
          "firstname": "John",
          "lastname": "Doe",
          "group": "Group A",
          "passed_tasks": [
            {
              "id": 1,
              "point": 8.0,
              "task": {
                "id": 1,
                "title": "Database Fundamentals",
                "max_point": 8.0
              },
              "is_assessed": true
            }
          ]
        },
        {
          "id": 2,
          "firstname": "John",
          "lastname": "Doe",
          "group": "Group A",
          "passed_tasks": [
            {
              "id": 1,
              "point": 8.0,
              "task": {
                "id": 1,
                "title": "Database Fundamentals",
                "max_point": 8.0
              },
              "is_assessed": true
            }
          ]
        },
        {
          "id": 3,
          "firstname": "John",
          "lastname": "Doe",
          "group": "Group A",
          "passed_tasks": [
            {
              "id": 1,
              "point": 8.0,
              "task": {
                "id": 1,
                "title": "Database Fundamentals",
                "max_point": 8.0
              },
              "is_assessed": true
            }
          ]
        }
      ]
    })
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
  },
  methods: {
    async uploadAssignmentAnswers() {
      await sendGET(
        endpoints.assignmentAnswers(this.routeParams.courseID, this.routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.studentAnswers = res
        }
      })
    },
  },
  async mounted() {
    this.uploadAssignmentAnswers()
  },
}
</script>

