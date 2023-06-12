<template>
  <CreateEditBlock
    :theme="theme"
  >
    <TitleBlock
      v-if="ifRouteNameIs(['create_assignment'])"
    >Create Assignment</TitleBlock>
    <TitleBlock
      v-else
    >Update Assignment</TitleBlock>
    <form>
      <SubtitleBlock>General Info</SubtitleBlock>
      <input
        placeholder="Assignment title"
        type="text"
        v-model="newAssignment.title"
      >
      <textarea
        class="create-edit__input_descr"
        placeholder="Assignment description"
        rows="5"
        v-model="newAssignment.description"
      ></textarea>
      <div class="create-edit__input-group">
        <input
          class="create-edit__input_num"
          placeholder="Max. grade"
          type="number"
          v-model="newAssignment.max_point"
        >
        <input
          type="date"
          v-model="newAssignment.start_date"
        >
        <input
          type="date"
          v-model="newAssignment.end_date"
        >
      </div>
      <div class="create-edit__input-group create-edit__input-group_hints">
        <span class="create-edit__input-hint_max-grade"></span>
        <span>Start Date</span>
        <span>End Date</span>
      </div>
      <div
        class="create-edit__btn"
        v-if="ifRouteNameIs(['create_assignment'])"
        @click="submit"
      >
        Create Assignment
      </div>
      <div
        class="create-edit__btn"
        v-else
        @click="submitUpdate"
      >
        Update Assignment
      </div>
    </form>
    <form>
      <SubtitleBlock>The Guidlines &amp; Requirements File</SubtitleBlock>
      <label
        class="create-edit__label create-edit__label_file"
        for="create-edit-file"
      >
        <div class="create-edit__label-content">
          <img
            :src="require(`@/assets/img/icons/file_add/file_add_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
            alt="add_file"
          >
          <span>{{ fileInfo.name }}</span>
        </div>
      </label>
      <input
        class="create-edit__input_file"
        id="create-edit-file"
        name="create-edit-file"
        type="file"
        accept="application/pdf"
        @change="updateFileInfo"
      >
      <div
        class="create-edit__btn"
        @click="submitFile"
      >
        Save Guidelines
      </div>
    </form>
    <form>
      <SubtitleBlock>Files Inspections</SubtitleBlock>
      <input
        placeholder="Assignment files inspections"
        type="text"
        v-model="inspections"
        v-if="ifRouteNameIs(['edit_assignment'])"
      >
      <p>Please fill in the files names separating them with ; sign only</p>
      <div
        class="create-edit__btn"
        @click="submitFilesToCheck"
      >
        Submit Files To Inspect
      </div>
    </form>
  </CreateEditBlock>
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import AssignmentAnswer from '@/components/AssignmentAnswer.vue'
import {
  AssignmentBlock,
  TitleBlock,
  CreateEditBlock,
  SubtitleBlock
} from "@/styles/styledBlocks.js"
import axios from 'axios'
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Assignment',
  components: {
    StudentsAnswers, AssignmentAnswer, AssignmentBlock, TitleBlock, CreateEditBlock, SubtitleBlock
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'formatDate', 'ifRouteNameIs', 'goTo', 'themeInfo', 'routeParams'],
  data() {
    return ({
      inspections: "",
      newAssignment: {
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
    async updateAssignment() {
      await sendGET(
        endpoints.assignmentTeacher(this.routeParams.courseID, this.routeParams.assignmentID),
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
    },
    async submit() {
      await sendPOST(endpoints.createAssingment(this.$route.params.courseID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.newAssignment)
      .then(res => {
        if (res.id) {
          console.log(res)
          this.goTo({ name: 'edit_assignment', params: { courseID: `${this.routeParams.courseID}`, assignmentID: `${res.id}` } })
        }
      })
    },
    async submitUpdate() {
      await sendPUT(endpoints.editAssingment(this.routeParams.courseID, this.routeParams.assignmentID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.newAssignment)
      .then(res => {
        if (res.successful_action) {
          console.log(res)
          this.updateAssignment()
        }
      })
    },
    async submitFilesToCheck() {
      await sendPOST(endpoints.filesToCheckAdd(this.routeParams.courseID, this.routeParams.assignmentID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.getFilesToCheck)
      .then(res => {
        if (res.length > 0) {
          console.log(res)
          this.updateAssignment()
        }
      })
    },
    async submitFile() {
      const formData = new FormData();
      formData.append('file', this.fileInfo);

      axios.post(endpoints.uploadAssignmentFile(this.routeParams.courseID, this.routeParams.assignmentID), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${this.getAccessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        this.updateAssignment()
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
    if (this.ifRouteNameIs(['edit_assignment']))
      this.updateAssignment()
  }
}

// {
//     "filename":"asfa.java"
// }

//custom checks field as an input with " ;" separation
</script>
