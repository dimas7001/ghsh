<template>
  <WorkflowBlock
    :theme="theme"
  >
    <TitleBlock
      :class="{'wf__title_teacher': !getUserIsStudent}"
    >{{ course.title }}</TitleBlock>
    <div>{{ course.description }}</div>
    <div class="wf__details">
      <div
        class="wf__teacher"
        v-if="getUserIsStudent"
        @click="goTo({ name: 'lecturer_profile'})"
      >{{ course.educator }}</div>
      <div
        v-if="anyAssignmentExist"
        class="wf__dates"
      >{{ formatDate(course.start_date) + ' – ' + formatDate(course.end_date) }}</div>
    </div>
    <NewItemBlock
      class="courses__create"
      v-if="!getUserIsStudent"
      :theme="theme"
      @click="goTo({ name: 'create_assignment'})"
    />
    <div
      class="wf-item__group"
      v-if="anyAssignmentExist"
    >
      <div
        class="wf-item__wrapper"
        v-for="assignment in currentAssignments"
        @click="goTo({ name: 'assignment', params: { assignmentID: `${assignment.id}` } })"
        :key="assignment.id"
      >
        <div
          class="wf-item"
          :class="{'wf-item_teacher': !getUserIsStudent}"
          :id="assignment.id"
          v-cloak
        >
          <div class="wf-item__block wf-item__block_description">
            <div class="wf-item__name">
              {{ assignment.title }}
            </div>
            <div
              class="wf-item__descr"
              v-html="assignment.description"
            ></div>
          </div>
          <div class="wf-item__block wf-item__block_dates">
            <div class="wf-item__date">
              {{ formatDate(assignment.start_date) }}
            </div>
            <div class="wf-item__date-separator"></div>
            <div class="wf-item__date">
              {{ formatDate(assignment.end_date) }}
            </div>
          </div>
          <Controls
            class="controls"
            :theme="theme"
            v-if="!getUserIsStudent"
          >
            <div
              class="controls__edit"
              @click.stop="goTo({ name: 'edit_assignment', params: { assignmentID: `${assignment.id}` } })"
            >
              <img
                :src="require(`@/assets/img/icons/edit/edit_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
                alt="edit"
              >
            </div>
            <div
              class="controls__delete"
              @click.stop="deleteAssignment(assignment.id)"
            >
              <img
                :src="require(`@/assets/img/icons/delete/delete_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
                alt="delete"
              >
            </div>
          </Controls>
        </div>
      </div>
    </div>
    <div class="wf-item__no-items">
      This course is empty yet :(
      <br>
      <span
        v-if="!getUserIsStudent"
      >Add some articles with +</span>
    </div>
  </WorkflowBlock>
</template>

<script>
import { SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Workflow',
  components: {
    SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock
  },
  props: {
    
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'themeInfo', 'goTo', 'formatDate', 'routeParams'],
  data() {
    return ({
      course: {}
    })
  },
  methods: {
    ...mapMutations(['DELETE_ASSIGNMENT']),
    async deleteAssignment(assignmentID) {
      await sendDELETE(
        endpoints.deleteAssignment(this.routeParams.courseID, assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res.successful_action) {
          console.log(res)
        }
      })
    },
    async uploadCourse() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.courseByIDStudent(this.routeParams.courseID) :
        endpoints.courseByIDTeacher(this.routeParams.courseID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.course = res
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserIsStudent']),
    anyAssignmentExist() {
      return this.currentAssignments ? true : false
    },
    currentAssignments() {
      return this.course.tasks
    },
  },
  async mounted() {
    this.uploadCourse()
  },
}
</script>
