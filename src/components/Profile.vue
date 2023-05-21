<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ currentAssignment.name }}</TitleBlock>
        <div class="assignment__btn">Rate The Answer</div>
      </div>
      <div class="assignment__description">{{ currentAssignment.description }}</div>
    </div>
  </AssignmentBlock>
  <AnswerInfoBlock
    :theme="theme"
  >
    <SubtitleBlock>{{ answer.studentName + ' ' + answer.studentSurname + ' - ' + answer.studentGroup }}</SubtitleBlock>
    <div class="answer-info__line answer-info__line_grade">
      <span class="answer-info__line-title">Grade:</span>
      {{ answer.answerGrade }}/{{ answer.maxGrade }}
    </div>
    <div class="answer-info__line answer-info__line_link">
      <span class="answer-info__line-title">GitHub Link:</span>
      <a :href="answer.answerLink">{{ answer.answerLink }}</a>
    </div>
    <div class="answer-info__line answer-info__line_document">
      <span class="answer-info__line-title">Report:</span>
      <a :href="answer.answerLink">{{ answer.answerFileName }}</a>
    </div>
    <div class="answer-info__line answer-info__line_comment">
      <span class="answer-info__line-title">Comment:</span>
      {{ answer.answerComment }}
    </div>
    <div class="answer-info__line answer-info__line_comment">
      <span class="answer-info__line-title">Inspections:</span>
      <div class="answer-info__line-labels">
        <div
          class="answer-info__label"
          v-for="label in answer.labels"
          :key="label.name"
        >
          {{ label.name }}
          <span v-if="label.passed">✔</span>
          <span v-else>✘</span>
        </div>
      </div>
    </div>
  </AnswerInfoBlock>
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
} from "../styles/styledBlocks.js"
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme'],
  data() {
    return ({
      answer: {
        answerID: "a1234",
        answerTitle: "My Answer Title 2",
        answerLink: "https://github.com/dimas7001/ghsh",
        answerComment: "Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish. Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish.",
        answerFileName: "dummy_file.pdf",
        answerGrade: 9,
        maxGrade: 10,
        studentName: "Name",
        studentSurname: "Surname",
        studentGroup: "IS-93",
        labels: [
          {
            name: '.gitigrore',
            passed: true
          },
          {
            name: 'readme',
            passed: false
          },
          {
            name: 'somethigelse.html',
            passed: true
          },
          {
            name: 'dontreadme',
            passed: false
          }
        ]
      },
    })
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['getAssignment', 'getUserRole']),
    currentAssignment() {
      return this.getAssignment(this.$route.params.assignmentID)
    },
  },
}
</script>
