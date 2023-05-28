<template>
  <AssignmentAnswerBlock
    :theme="theme"
  >
    <div class="assignment-answer">
      <SubtitleBlock>Your Answer</SubtitleBlock>
      <div
        class="assignment-answer__form"
        v-if="!existingAnswerEmpty"
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
              <span>{{ assignmentFormData.assignmentFile.name }}</span>
            </div>
          </label>
          <input
            class="assignment-answer__input assignment-answer__input_file"
            id="assignment-answer-file"
            name="assignment-answer-file"
            type="file"
            accept="application/pdf"
            @change="updateFileInfo"
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
            :href="existingAnswer.github_reference"
            target="_blank"
          >{{ existingAnswer.github_reference }}</a>
          <a
            class="assignment-answer__file-name"
            :href="existingAnswer.reference"
            v-if="existingAnswer.reference"
          >{{ existingAnswer.reference }}</a>
        </div>
        <div
          class="assignment-answer__comment"
          v-if="existingAnswer.student_comment"
        >{{ existingAnswer.student_comment }}</div>
        <Controls
          class="controls"
          :theme="theme"
        >
          <div
            class="controls__delete"
            @click.stop="deleteAnswer(existingAnswer.id)"
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
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'AssignmentAnswer',
  components: {
    AssignmentAnswerBlock, SubtitleBlock, Controls
  },
  emits: ['toggle-alert', 'update-current-grade'],
  inject: ['theme', 'themeInfo', 'goTo'],
  data() {
    return ({
      assignmentFormData: {
        assignmentTitle: "",
        assignmentLink: "",
        assignmentComment: "",
        assignmentFile: "",
      },
      existingAnswer: {
        // "id": 1,
        // "reference": "lab1_john.pdf",
        // "point": 8.0,
        // "task": {
        //   "id": 1,
        //   "title": "Database Fundamentals",
        //   "max_point": 8.0
        // },
        // "github_reference": "https://github.com/UnforgettableDew/SecurityPart",
        // "is_assessed": true,
        // "educator_comment": "great",
        // "student_comment": "Long-finned char silver dollar yellowtail clownfish mooneye slimy mackerel rohu roosterfish rockling fire bar danio icefish cow shark.",
        // "submission_date": "2023-01-08T12:30:00.000+00:00"
      },
    })
  },
  methods: {
    updateFileInfo(e) {
      console.log(e.target.files[0])
      this.assignmentFormData.assignmentFile = e.target.files[0]
    },
    async submitFile() {
      const formData = new FormData();
      formData.append('file', this.assignmentFormData.assignmentFile);

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
    existingAnswerEmpty() {
      return Object.keys(this.existingAnswer).length ? true : false
    },
  },
}

// { form data
//     "github_reference": "https://github.com/amigoscode/microservices",
//     "student_comment": "sexik nash lubimyi"
// }

</script>
