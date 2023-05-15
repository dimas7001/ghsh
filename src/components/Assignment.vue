<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <TitleBlock>{{ currentAssignment.name }}</TitleBlock>
      <div class="assignment__description">{{ currentAssignment.description }}</div>
    </div>
  </AssignmentBlock>
  <!-- <AssignmentAnswerBlock
    :theme="theme"
  >
    <div class="assignment-answer">
      <SubtitleBlock>Your Answer</SubtitleBlock>
      <div class="assignment-answer__form">
        <div class="assignment-answer__group">
          <label
            class="assignment-answer__label"
            for="assignment-answer-title"
          >Work Title</label>
          <input
            class="assignment-answer__input assignment-answer__input_title"
            placeholder="Your work title, please"
            id="assignment-answer-title"
            name="assignment-answer-title"
            type="text"
            v-model="assignmentFormData.assignmentTitle"
          >
        </div>
        <div class="assignment-answer__group">
          <label
            class="assignment-answer__label"
            for="assignment-answer-link"
          >GitHub Link</label>
          <input
            class="assignment-answer__input assignment-answer__input_link"
            placeholder="Paste your repo url"
            id="assignment-answer-link"
            name="assignment-answer-link"
            type="link"
            v-model="assignmentFormData.assignmentLink"
          >
        </div>
        <div class="assignment-answer__group">
          <label
            class="assignment-answer__label"
            for="assignment-answer-comment"
          >Your Comment</label>
          <textarea
            class="assignment-answer__input assignment-answer__input_comment"
            placeholder="Your comment"
            id="assignment-answer-comment"
            name="assignment-answer-comment"
            type="text"
            v-model="assignmentFormData.assignmentComment"
          ></textarea>
        </div>
        <div class="assignment-answer__group assignment-answer__group_submit">
          <label
            class="assignment-answer__label assignment-answer__label_file"
            for="assignment-answer-file"
          >
            <span>Report File (.pdf )</span>
            <div class="assignment-answer__subblock">
              <img
                :src="require(`@/assets/img/icons/file/file_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
                alt="add_file"
              >
              <span>{{ assignmentFormData.assignmentFileName }}</span>
            </div>
          </label>
          <input
            class="assignment-answer__input assignment-answer__input_file"
            id="assignment-answer-file"
            name="assignment-answer-file"
            type="file"
            accept="application/pdf"
            @change="submitFile"
          >
          <div
            class="assignment-answer__submit"
            :class="{'assignment-answer__submit_inactive': !formDataEnough}"
            @click="submitAnswer"
          >Submit ✔</div>
        </div>
      </div>
      <div class="assignment-answer__submitted">
        <div class="assignment-answer__head">
          <div class="assignment-answer__title">{{ existingAnswer.answerTitle }}</div>
          <a
            class="assignment-answer__link"
            :href="existingAnswer.answerLink"
            target="_blank"
          >{{ existingAnswer.answerLink }}</a>
        </div>
        <div
          class="assignment-answer__comment"
          v-if="existingAnswer.answerComment"
        >{{ existingAnswer.answerComment }}</div>
        <div
          class="assignment-answer__file-name"
          v-if="existingAnswer.answerFileName"
        >{{ existingAnswer.answerFileName }}</div>
        <Controls
          class="controls"
          :theme="theme"
        >
          <div
            class="controls__delete"
            @click.stop="deleteAnswer(existingAnswer.answerID)"
          >
            <img
              :src="require(`@/assets/img/icons/delete/delete_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
              alt="delete"
            >
          </div>
        </Controls>
      </div>
    </div>
  </AssignmentAnswerBlock> -->
  <StudentsAnswersBlock
    :theme="theme"
  >
    <SubtitleBlock>Students' Answers</SubtitleBlock>
    <div
      class="answer"
      v-for="answer in studentAnswers"
      :key="answer.answerID"
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
  AssignmentBlock,
  TitleBlock,
  AssignmentAnswerBlock,
  SubtitleBlock,
  Controls,
  StudentsAnswersBlock
} from "../styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Assignment',
  components: {
    AssignmentBlock, TitleBlock, AssignmentAnswerBlock, SubtitleBlock, Controls, StudentsAnswersBlock
  },
  props: {
    themeInfo: Object,
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'goTo'],
  data() {
    return ({
      assignmentFormData: {
        assignmentTitle: "",
        assignmentLink: "",
        assignmentComment: "",
        assignmentFileName: "",
      },
      existingAnswer: {
        answerID: "a1234",
        answerTitle: "My Answer Title 1",
        answerLink: "https://github.com/dimas7001/ghsh",
        answerComment: "Sleeper shark basking shark: sea chub convict cichlid velvet-belly shark galjoen fish, tripletail; longfin dragonfish.",
        answerFileName: "dummy_file.pdf",
      },
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
  methods: {
    async submitFile(e) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://25.59.188.46:8080/api/v1/student/course/3/task/11/lab/40/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${this.getAccessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  },
  computed: {
    ...mapGetters(['getAssignment', 'getAccessToken']),
    currentAssignment() {
      return this.getAssignment(this.$route.params.assignmentID)
    },
    formDataEnough() {
      return this.assignmentFormData.assignmentTitle && this.assignmentFormData.assignmentLink
    }
  },
  watch: {
    
  },
}
</script>
