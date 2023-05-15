<template>
  <AssignmentAnswerBlock
    :theme="theme"
  >
    <div class="assignment-answer">
      <SubtitleBlock>Your Answer</SubtitleBlock>
      <div
        class="assignment-answer__form"
        v-if="!isSubmitted"
      >
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
      <div
        class="assignment-answer__submitted"
        v-else
      >
        <div class="assignment-answer__head">
          <a
            class="assignment-answer__link"
            :href="existingAnswer.answerLink"
            target="_blank"
          >{{ existingAnswer.answerLink }}</a>
          <a
            class="assignment-answer__file-name"
            :href="existingAnswer.answerLink"
            v-if="existingAnswer.answerFileName"
          >{{ existingAnswer.answerFileName }}</a>
        </div>
        <div
          class="assignment-answer__comment"
          v-if="existingAnswer.answerComment"
        >{{ existingAnswer.answerComment }}</div>
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
  </AssignmentAnswerBlock>
</template>

<script>
import {
  AssignmentAnswerBlock,
  SubtitleBlock,
  Controls,
} from "../styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'AssignmentAnswer',
  components: {
    AssignmentAnswerBlock, SubtitleBlock, Controls
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'themeInfo', 'goTo'],
  data() {
    return ({
      isSubmitted: false,
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
    ...mapGetters(['getAccessToken']),
    formDataEnough() {
      return this.assignmentFormData.assignmentLink
    },
  },
}
</script>
