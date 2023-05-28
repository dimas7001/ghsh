<template>
  <StudentsAnswersBlock
    :theme="theme"
  >
    <SubtitleBlock>Students' Answers</SubtitleBlock>
    <div
      class="answer"
      v-for="answer in studentAnswers"
      :key="answer.id"
      @click="goTo({ name: 'answer', params: { answerID: answer.id } })"
    >
      <div class="answer__section answer__section_info">
        <div class="answer__block">
          <div class="answer__student-info">{{ answer.firstname + ' ' + answer.lastname + ' - ' + answer.group }}</div>
          <a
            class="answer__link"
            :href="answer.answerLink"
            target="_blank"
          >{{ "ADD_LINK_TO_RESPONCE" }}</a>
        </div>
        <div
          class="answer__comment"
          v-if="true/*answer.answerComment*/"
        >{{ "ADD_COMMENT_TO_RESPONCE" }}</div>
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
}
</script>

