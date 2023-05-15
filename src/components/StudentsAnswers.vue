<template>
  <StudentsAnswersBlock
    :theme="theme"
  >
    <SubtitleBlock>Students' Answers</SubtitleBlock>
    <div
      class="answer"
      v-for="answer in studentAnswers"
      :key="answer.answerID"
      @click="goTo({ name: 'answer', params: { answerID: answer.answerID } })"
    >
      <div class="answer__section answer__section_info">
        <div class="answer__student-info">{{ answer.studentName + ' ' + answer.studentSurname + ' - ' + answer.studentGroup }}</div>
        <div class="answer__block">
          <div class="answer__title">{{ answer.answerTitle }}</div>
          <a
            class="answer__link"
            :href="answer.answerLink"
            target="_blank"
          >{{ answer.answerLink }}</a>
        </div>
        <div
          class="answer__comment"
          v-if="answer.answerComment"
        >{{ answer.answerComment }}</div>
      </div>
      <div class="answer__section answer__section_labels">
        <div
          class="answer__label"
          v-for="label in answer.labels"
          :key="label.name"
        >
        {{ label.name }}
        <span v-if="label.passed">✔</span>
        <span v-else>✘</span>
        </div>
      </div>
      <div class="answer__section answer__section_grade">
        <span>{{ answer.answerGrade }}/{{ answer.maxGrade }}</span>
      </div>
    </div>
  </StudentsAnswersBlock>
</template>

<script>
import {
  SubtitleBlock,
  StudentsAnswersBlock
} from "../styles/styledBlocks.js"

export default {
  name: 'StudentsAnswers',
  components: {
    SubtitleBlock, StudentsAnswersBlock
  },
  inject: ['theme', 'goTo'],
  data() {
    return ({
      studentAnswers: [
        {
          answerID: "a1234",
          answerTitle: "My Answer Title 2",
          answerLink: "https://github.com/dimas7001/ghsh",
          answerComment: "Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish.",
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
        {
          answerID: "a1235",
          answerTitle: "My Answer Title 3",
          answerLink: "https://github.com/dimas7001/ghsh",
          answerComment: "Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish.",
          answerFileName: "dummy_file.pdf",
          answerGrade: 9,
          maxGrade: 10,
          labels: [
            {
              name: '.gitigrore',
              passed: true
            },
            {
              name: 'readme',
              passed: false
            }
          ]
        },
        {
          answerID: "a1236",
          answerTitle: "My Answer Title Title Title 4",
          answerLink: "https://github.com/dimas7001/ghsh",
          answerComment: "Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish.",
          answerFileName: "dummy_file.pdf",
          answerGrade: 9,
          maxGrade: 10,
          labels: [
            {
              name: '.gitigrore',
              passed: true
            },
            {
              name: 'readme',
              passed: false
            }
          ]
        }
      ]
    })
  },
}
</script>

