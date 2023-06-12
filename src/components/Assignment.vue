<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ assignment.title }}</TitleBlock>
        <div
          class="assignment__btn"
          v-if="!getUserIsStudent"
          @click.stop="goTo({ name: 'edit_assignment', params: { assignmentID: `${assignment.id}` } })"
        >Edit</div>
      </div>
      <div class="assignment__materials">
        <div
          @click="downloadFile"
          class="assignment__attachment"
        >
          <img
            :src="require(`@/assets/img/icons/file/file_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
            alt="download_attachment"
          >
        </div>
        <div class="assignment__description">{{ assignment.description }}</div>
      </div>
      <div class="assignment__details">
        <div class="assignment__grade">
          <span
            v-if="getUserIsStudent"
          >{{ getCurrentGrade + '/' + assignment.max_point }} points</span>
          <span
            v-else
          >max. {{ assignment.max_point }} points</span>
        </div>
        <div class="assignment__dates">{{ formatDate(assignment.start_date) + ' – ' + formatDate(assignment.end_date) }}</div>
      </div>
      <div class="assignment__btn-group">
        <div
          class="assignment__btn"
          @click="createAssignmentRepo"
        >Create Assignment Repo</div>
        <div
          class="assignment__btn"
          @click="importAssignmentRepo"
        >Import Assignment Repo</div>
      </div>
    </div>
  </AssignmentBlock>
  <AssignmentAnswer
    v-if="getUserIsStudent"
    :update-current-grade="updateCurrentGrade"
    :existing-answer-update-flag="existingAnswerUpdateFlag"
  />
  <StudentsAnswers
    v-else
  />
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import AssignmentAnswer from '@/components/AssignmentAnswer.vue'
import {
  AssignmentBlock,
  TitleBlock
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import axios from 'axios'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Assignment',
  components: {
    StudentsAnswers, AssignmentAnswer, AssignmentBlock, TitleBlock
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'themeInfo', 'formatDate', 'routeParams', 'goTo'],
  data() {
    return {
      currentGrade: '-',
      assignment: {},
      existingAnswerUpdateFlag: 0,
    }
  },
  methods: {
    updateCurrentGrade(grade) {
      console.log('triggered 2', grade)
      this.currentGrade = grade
    },
    async downloadFile() {
      axios({
        url: endpoints.downloadAssignmentFile(this.routeParams.courseID, this.routeParams.assignmentID),
        method: 'GET',
        headers: {"Authorization": `Bearer ${this.getAccessToken}`},
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
      
        fileLink.href = fileURL;
        // console.log(fileURL)
        fileLink.setAttribute('download', 'file.pdf');
        document.body.appendChild(fileLink);
      
        fileLink.click();
      })
    },
    async createAssignmentRepo() {
      await sendPOST(
        this.getUserIsStudent ?
        endpoints.createAssignmentRepoStudent(this.routeParams.courseID, this.routeParams.assignmentID) :
        endpoints.createAssignmentRepoTeacher(this.routeParams.courseID, this.routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`},
        {
          "name": this.assignment.title + '1',
          "description": this.assignment.description
        }
      )
      .then(res => {
        if (res.html_url) {
          console.log(res)
          this.updateExistingAnswer()
        }
      })
    },
    async importAssignmentRepo() {
      await sendPUT(
        endpoints.importAssignmentRepoStudent(this.routeParams.courseID, this.routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`},
        {}
      )
      .then(res => {
        if (res.successful_action) {
          console.log(res)
        }
      })
    },
    updateExistingAnswer() {
      this.existingAnswerUpdateFlag++
      console.log(this.existingAnswerUpdateFlag)
    }
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    getCurrentGrade() {
      return this.currentGrade
    }
  },
  async mounted() {
    await sendGET(
      this.getUserIsStudent ?
      endpoints.assignmentStudent(this.routeParams.courseID, this.routeParams.assignmentID) :
      endpoints.assignmentTeacher(this.routeParams.courseID, this.routeParams.assignmentID),
      {"Authorization": `Bearer ${this.getAccessToken}`}
    )
    .then(res => {
      if (res) {
        this.assignment = res
      }
    })
  }
}
</script>
