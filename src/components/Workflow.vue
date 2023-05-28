<template>
  <WorkflowBlock
    :theme="theme"
  >
    <TitleBlock>Course Title</TitleBlock>
    <!-- <div class="wf-item__group">
      <div
        @click="downloadFile"
      >click to save</div>
    </div> -->
    <NewItemBlock
      :theme="theme"
      class="courses__create"
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
              {{ formatDate(assignment.startDate) }}
            </div>
            <div class="wf-item__date-separator"></div>
            <div class="wf-item__date">
              {{ formatDate(assignment.endDate) }}
            </div>
          </div>
          <Controls
            class="controls"
            :theme="theme"
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
      This course is empty :(
      <br>
      Add some articles with +
    </div>
  </WorkflowBlock>
</template>

<script>
import { SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'Workflow',
  components: {
    SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock
  },
  props: {
    
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'themeInfo', 'goTo', 'formatDate'],
  data() {
    return ({
      course: {
        id: 1,
        "title": "Back-end",
        "description": "Course for Back-end developers",
        "educator": "Kostyantin Zhereb",
        "tasks": [
          {
            "id": 1,
            "title": "Database Fundamentals",
            description: "Learn the basics of database design and management",
            "startDate": "2023-01-08T12:30:00.000+00:00",
            "endDate": "2023-01-08T12:30:00.000+00:00",
            "max_point": 8.0
          },
          {
            "id": 2,
            "title": "SQL Queries",
            "description": "Learn how to write SQL queries to retrieve and manipulate data",
            "startDate": "2023-01-10T12:30:00.000+00:00",
            "endDate": "2023-01-15T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 3,
            "title": "Server-side Scripting",
            "description": "Learn how to write server-side scripts using PHP",
            "startDate": "2023-01-16T12:30:00.000+00:00",
            "endDate": "2023-01-20T12:30:00.000+00:00",
            "max_point": 9.0
          },
          {
            "id": 4,
            "title": "API Development",
            "description": "Learn how to develop RESTful APIs for web applications",
            "startDate": "2023-01-21T12:30:00.000+00:00",
            "endDate": "2023-01-23T12:30:00.000+00:00",
            "max_point": 10.0
          },
          {
            "id": 5,
            "title": "Security and Authentication",
            "description": "Learn about web application security and authentication techniques",
            "startDate": "2023-01-24T12:30:00.000+00:00",
            "endDate": "2023-01-30T12:30:00.000+00:00",
            "max_point": 10.0
          }
        ],
        "start_date": "2023-01-08T12:30:00.000+00:00",
        "end_date": "2023-03-08T12:30:00.000+00:00"
      }
    })
  },
  methods: {
    ...mapMutations(['DELETE_ASSIGNMENT']),
    deleteAssignment(id) {
      // $emit('ask-question', 'Do you really want to delete this assignment?', this.DELETE_ASSIGNMENT)
      this.DELETE_ASSIGNMENT(id)
    },
    async downloadFile() {
      axios({
        url: 'http://25.59.188.46:8080/api/v1/student/courses/1/task/1/download',
        method: 'GET',
        headers: {"Authorization": `Bearer ${this.getAccessToken}`},
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
      
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.docx');
        document.body.appendChild(fileLink);
      
        fileLink.click();
      })
    },
    addArticle() {
      console.log('addArticle triggered')
    },
  },
  computed: {
    ...mapGetters(['getCourseAssignments', 'getAccessToken']),
    anyAssignmentExist() {
      return this.currentAssignments ? true : false
    },
    currentAssignments() {
      return this.course.tasks
    },
  },
  watch: {
    $props: {
      handler() { //when notes type changes discard search results if search was active
        if (this.searchValue) {
          this.notesWasHidden = false
          this.searchValue = ''
        }
      },
      deep: true,
    },
    searchValue() {
      if (this.searchValue.length > 2)  //if searchValue length > 2 start search
        this.filterNotes()
      else if (this.notesWasHidden) //if searchValue length < 2 show all hidden notes if exist
        this.showHiddenNotes()
    },
  },
}
</script>
