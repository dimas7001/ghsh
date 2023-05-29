<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ currentAssignment.title }}</TitleBlock>
        <div
          @click="downloadFile"
        >||downloadFile||</div>
        <div class="assignment__btn">Edit</div>
      </div>
      <div class="assignment__description">{{ currentAssignment.description }}</div>
      <div class="assignment__details">
        <div class="assignment__grade">
          <span
            v-if="getUserIsStudent"
          >{{ currentGrade + '/' + currentAssignment.max_point }} points</span>
          <span
            v-else
          >max. {{ currentAssignment.max_point }} points</span>
        </div>
        <div class="assignment__dates">{{ formatDate(currentAssignment.start_date) + ' – ' + formatDate(currentAssignment.end_date) }}</div>
      </div>
    </div>
  </AssignmentBlock>
  <AssignmentAnswer
    v-if="getUserIsStudent"
    :update-current-grade="updateCurrentGrade"
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
  inject: ['theme', 'formatDate'],
  data() {
    return ({
      currentGrade: '-',
      assignment: {
        "id": 1,
        "title": "Database Fundamentals",
        description: "Mummichog; orange roughy mora deep sea anglerfish bluntnose knifefish Chinook salmon titan triggerfish, brook lamprey?",
        "start_date": "2023-01-08T12:30:00.000+00:00",
        "end_date": "2023-01-08T12:30:00.000+00:00",
        "max_point": 8.0
      },
    })
  },
  methods: {
    updateCurrentGrade(grade) {
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
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    currentAssignment() {
      return this.assignment
    },
    routeParams() {
      return this.$route.params
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
