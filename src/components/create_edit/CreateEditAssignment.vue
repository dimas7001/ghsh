<template>
  <form>
    <br><br>
    <input
      class=""
      placeholder="Assignment name"
      type="text"
      v-model="newAssignment.title"
    >
    <br>
    <input
      class=""
      placeholder="Assignment description"
      type="text"
      v-model="newAssignment.description"
    >
    <br>
    <input
      class=""
      placeholder="Assignment max. grade"
      type="number"
      v-model="newAssignment.max_point"
    >
    <br>
    <input
      class=""
      type="date"
      v-model="newAssignment.start_date"
    >
    <br>
    <input
      class=""
      type="date"
      v-model="newAssignment.end_date"
    >
    <br><br>
    <div
      class="btn"
      @click="submit"
    >
      ||Create||
    </div>
    <div
      class="btn"
      @click="submitUpdate"
    >
      ||UpdateTask||
    </div>
    <br><br>
    <input
      class=""
      placeholder="Assignment files inspections"
      type="text"
      v-model="inspections"
      v-if="ifRouteNameIs(['edit_assignment'])"
    >
    <br><br>
    <div
      class="btn"
      @click="submitFilesToCheck"
    >
      ||UpdateFilesToCheck||
    </div>
    <br><br>
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
          <span>{{ fileInfo.name }}</span>
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
    </div>
    <br><br>
    <div
      class="btn"
      @click="submitFile"
    >
      ||AddAssignmentFile||
    </div>
  </form>
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import AssignmentAnswer from '@/components/AssignmentAnswer.vue'
import {
  AssignmentBlock,
  TitleBlock
} from "@/styles/styledBlocks.js"
import axios from 'axios'
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Assignment',
  components: {
    StudentsAnswers, AssignmentAnswer, AssignmentBlock, TitleBlock
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'formatDate', 'ifRouteNameIs', 'goTo', 'themeInfo'],
  data() {
    return ({
      inspections: "",
      newAssignment: {
        "title": "",
        description: "",
        "start_date": "",
        "end_date": "",
        "max_point": 0,
      },
      assignment: {
        "id": 1,
        "title": "Database Fundamentals",
        description: "Mummichog; orange roughy mora deep sea anglerfish bluntnose knifefish Chinook salmon titan triggerfish, brook lamprey?",
        "start_date": "2023-01-08T12:30:00.000+00:00",
        "end_date": "2023-01-08T12:30:00.000+00:00",
        "max_point": 8.0,
      },
      fileInfo: '',
    })
  },
  methods: {
    updateCurrentGrade(grade) {
      this.currentGrade = grade
    },
    async submit() {
      await sendPOST(endpoints.createAssingment(this.$route.params.courseID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.newAssignment)
      .then(res => {
        if (res.id) {
          console.log(res)
          this.goTo({ name: 'course' })
        }
      })
    },
    async submitUpdate() {
      let routeParams = this.$route.params
      await sendPUT(endpoints.editAssingment(routeParams.courseID, routeParams.assignmentID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.newAssignment)
      .then(res => {
        if (res.successful_action) {
          console.log(res)
          // this.goTo({ name: 'courses' })
        }
      })
    },
    async submitFilesToCheck() {
      let routeParams = this.$route.params
      await sendPOST(endpoints.filesToCheckAdd(routeParams.courseID, routeParams.assignmentID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.getFilesToCheck)
      .then(res => {
        if (res.length > 0) {
          console.log(res)
          // this.goTo({ name: 'courses' })
        }
      })
    },
    async submitFile() {
      let routeParams = this.$route.params
      const formData = new FormData();
      formData.append('file', this.fileInfo);

      axios.post(endpoints.uploadAssignmentFile(routeParams.courseID, routeParams.assignmentID), formData, {
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
    },
    updateFileInfo(e) {
      console.log(e.target.files[0])
      this.fileInfo = e.target.files[0]
    },
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    currentAssignment() {
      return this.assignment
    },
    getFilesToCheck() {
      let filesArr = []
      this.inspections.split(';').forEach(file => filesArr.push({filename: file}))
      return filesArr
    },
  },
  async mounted() {
    let routeParams = this.$route.params
    if (this.ifRouteNameIs(['edit_assignment']))
      await sendGET(
        endpoints.assignmentTeacher(routeParams.courseID, routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.newAssignment = this.assignment = res
          res.filesToCheck.forEach(file => 
            this.inspections += file
          )
        }
      })
  }
}

// {
//     "filename":"asfa.java"
// }

//custom checks field as an input with " ;" separation
</script>
